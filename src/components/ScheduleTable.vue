<template>
    <table class="schedule-table table primary theme basic" :class="{'table_load': loadingSchedule}">
        <thead :style="{'display': (min)?'none':''}">
          <tr>
            <th>Horas</th>
            <th><span class="show-min-md">(L)</span> Lunes</th>
            <th><span class="show-min-md">(K)</span> Martes</th>
            <th><span class="show-min-md">(M)</span> Miércoles</th>
            <th><span class="show-min-md">(J)</span> Jueves</th>
            <th><span class="show-min-md">(V)</span> Viernes</th>
            <th><span class="show-min-md">(S)</span> Sábado</th>
            <th><span class="show-min-md">(D)</span> Domingo</th>
          </tr>
        </thead>
        <tbody>
            <template v-for="i in (config.lastHour - config.firstHour +1)">
            <tr :key="'row-' + i">
              <th :style="{'display': (min)?'none':''}">
                {{n(i + config.firstHour -1)}}:00<span class="show-min-md"> - {{n(i + config.firstHour -1)}}:50</span>
              </th>
              <template v-for="(data, j) in table[i-1]">
                <td
                    v-if="!(config.coursesAsBlock && data.initRow < (i-1))"
                    :key="'data-' + i + '-' + j"
                    :rowspan="(config.coursesAsBlock && data.initRow == (i-1))?data.length:''"
                    :style="[
                        (data.ref && data.ref.color) ? {'--color': data.ref.color} : '', 
                        (commands.lol && randomColors && randomColors[i] && randomColors[i][j] )?{'--color': randomColors[i][j]} :'red'
                    ]"
                    @click="removeTime(i-1, (data.day?data.day:''), (data.ref?data.ref:null))"
                >{{(min)?'':data.text}}</td>
              </template>
            </tr>
          </template>
        </tbody>
    </table>
</template>

<script>
import Vuex from 'vuex'
import { setInterval } from 'timers';

export default {
    name: 'ScheduleTable',
    props: {
        min: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            colorLolInterval: null,
            randomColors: []
        }
    },
    computed: {
        ...Vuex.mapState(['config', 'commands', 'loadingSchedule']),
        courses () {
            return this.$store.state.schedule.courses
        },
        table(){
            let table = []
            const colNumber = Object.keys(this.config.days).length
            for (let i = 0; i < (this.config.lastHour - this.config.firstHour + 1); i++) {
                table[i] = []
                for (let j = 0; j < colNumber; j++) {
                    table[i][j] = {
                        text:''
                    }
                }
            }
            for (let course of this.courses) {
                for (let time of course.times) {
                    let col = this.letterDayToCol(time.day)
                    let initRow = this.hourToRow(time.init)
                    let endRow = this.hourToRow(time.end) + 1
                    for (var i = initRow; i < endRow; i++) {
                        table[i][col] = {
                            text: course.name,
                            ref: course,
                            day: time.day,
                            initRow,
                            endRow,
                            length: endRow - initRow
                        }
                    }
                }
            }
            return table
        }
    },
    methods: {
        ...Vuex.mapMutations(['updateCourse', 'removeCourse']),
        letterDayToCol(letter){
            let i = 0
            for (let day in this.config.days) {
                if(letter == day){
                return i
                }
                i++
            }
            return -1
        },
        hourToRow(hour){
            let h = parseInt(hour.split(':')[0])
            return h - this.config.firstHour
        },
        n(num){
            if(num<10){
                return '0'+num
            }
            return num
        },
        removeTime (row, day, course) {
            if (day.trim() != '' && course != null) {
                let originalCourse = course
                course = JSON.parse(JSON.stringify(course))
                let initHour = this.rowToHour(row, '00')
                let endHour = this.rowToHour(row, '50')
                let times = course.times.filter(e => {
                    return e.day == day
                })
                for (let time of times) {
                    if(time.init == initHour && time.end == endHour){
                        this.removeElementToArray(course.times, time)
                    }else if(time.init == initHour){
                        time.init = this.rowToHour(row + 1, '00')
                    }else if(time.end == endHour){
                        time.end = this.rowToHour(row - 1, '50')
                    }else if(time.init < initHour && time.end > endHour){
                        let newTime = {
                            day: day,
                            init: this.rowToHour(row + 1, '00'),
                            end: time.end
                        }
                        time.end = this.rowToHour(row - 1, '50')
                        course.times.push(newTime)
                    }
                }

                if(course.times.length == 0){
                    this.removeCourse(originalCourse)
                }else{
                    this.updateCourse(course)
                }
            }
        },
        rowToHour(row, end){
            return this.n(row + this.config.firstHour) + ':' + end
        },
        removeElementToArray(array, element){
            let index = array.indexOf(element)
            if (index > -1) {
                array.splice(index, 1)
            }
            return array
        },
        randomColor(){
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        colorLol (doit) {
            if (doit) {
                this.colorLolInterval = setInterval(() => {
                    let temp = []
                    for (let i = 0; i <= this.config.lastHour - this.config.firstHour + 1; i++) {
                        temp[i] = []
                        for (let j = 0; j < 7; j++) {
                            temp[i][j] = this.randomColor()
                        }
                    }
                    this.randomColors = temp
                    document.body.style.setProperty('--primary', this.randomColor())
                    document.body.style.setProperty('--secondary', this.randomColor())
                    document.body.style.setProperty('--grey', this.randomColor())
                    document.body.style.setProperty('--ligth-grey', this.randomColor())
                }, 600)
            }else{
                clearInterval(this.colorLolInterval._id)
                this.colorLolInterval = null
                document.body.style.removeProperty('--primary')
                document.body.style.removeProperty('--secondary')
                document.body.style.removeProperty('--grey')
                document.body.style.removeProperty('--ligth-grey')
            }
        }
    },
    watch: {
        'commands.lol': {
            handler (value){
                this.colorLol(value)
            }
        }
    }
}
</script>

<style lang="scss">
.table{
  box-shadow: 0 0 20px rgba(0,0,0,.3);
  font-size: 0.875em;
  width: 100%;
  background-color: var(--ligth-grey);
  color: white;
}

.table th{
  background: var(--color);
  text-align: center;
}

.table td, .table th {
    border: 3px solid var(--secondary);
    width: 10%;
    padding: 8px 10px;
    vertical-align: middle;
}

.table__toImage td, .table__toImage th{
  border-width: 1px;
}

.table td{
  --color: transparent;
  background: var(--color);
  text-align: center;
  user-select: none;
  cursor: url(../assets/x.png),auto
}

.table td:empty {
    cursor: default
}

.table_load {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 1200px 104px;
    position: relative;
}

@keyframes placeHolderShimmer{
    0%{
        background-position: -1200px 0
    }
    100%{
        background-position: 1200px 0
    }
}

</style>