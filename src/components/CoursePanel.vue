<template>
    <div
    style="display: none"
    :style="'display: auto'"
    :class="{'lg-20 init-lg-3 xl-18 init-xl-4':commands.colorEditor, 'lg-16 init-lg-5 xl-14 init-xl-6': !commands.colorEditor}"
    class="
    col
    xs-22 init-xs-2
    md-22 init-md-2
    course-panel
    primary
    deep-2"
    >
        <alert :message="error.message" :list="error.list" :title="error.title" type="error"></alert>
        <div class="row-m">
            <div class="col" :class="{'sm-5':commands.colorEditor, 'sm-6':!commands.colorEditor}">
            <label class="form__label" for="course">Nombre del curso:</label>
            <input type="text" id="course" class="form__input dark-theme__text-dark" v-model="name" list="cursos">
            <datalist id="cursos">
                <option :value="course" v-for="course in datalistCoursesName" :key="'course-name-option-' + course"></option>
            </datalist>
            </div>
            <div class="col" :class="{'sm-8':commands.colorEditor, 'sm-9':!commands.colorEditor}">
            <label class="form__label">Días:</label>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="l" v-model="days.l">
                <label class="form__label" for="l">L</label>
            </div>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="k" v-model="days.k">
                <label class="form__label" for="k">K</label>
            </div>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="m" v-model="days.m">
                <label class="form__label" for="m">M</label>
            </div>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="j"  v-model="days.j">
                <label class="form__label" for="j">J</label>
            </div>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="v"  v-model="days.v">
                <label class="form__label" for="v">V</label>
            </div>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="s"  v-model="days.s">
                <label class="form__label" for="s">S</label>
            </div>
            <div class="form__input__container custom">
                <input type="checkbox" class="form__checkbox" id="d"  v-model="days.d">
                <label class="form__label" for="d">D</label>
            </div>
            </div>
            <div class="col xs-12 sm-3">
                <label class="form__label">Desde:</label>
                <div class="form__select__container">
                    <select class="form__input form__select dark-theme__text-dark" name="" v-model="init">
                    <option disabled value="-1" selected>---</option>
                    <template v-for="(hour, i) in initHours">
                        <option :value="i" :key="'init-hour-option-' + i">{{hour}}</option>
                    </template>
                    </select>
                </div>
            </div>
            <div class="col xs-12 sm-3">
                <label class="form__label">Hasta:</label>
                <div class="form__select__container">
                    <select class="form__input form__select dark-theme__text-dark" name="" v-model="end">
                    <option disabled value="-1" selected>---</option>
                    <template v-for="(hour, i) in endHours">
                        <option :value="hourToRow(hour)" :key="'end-hour-option-' + i">{{hour}}</option>
                    </template>
                    </select>
                </div>
            </div>
            <div class="col" :class="{'sm-2':commands.colorEditor, 'hide':!commands.colorEditor}">
            <label class="form__label">Color:</label>
            <color-picker v-model="color"></color-picker>
            </div>
            <div class="col sm-3">
            <button class="btn primary custom btn__100" @click="add()">
                Agregar
            </button>
            </div>
        </div>
    </div>
</template>
<script>
import Vuex from 'vuex'
import ColorPicker from '@/components/ColorPicker'
import Alert from '@/components/Alert'

export default {
    name: 'CoursePanel',
    components: {
        ColorPicker,
        Alert
    },
    data () {
        return {
            name: '',
            color: 'var(--primary)',
            init: -1,
            end: -1,
            error: {
                title: '¡Ha habido un problema!',
                message: '',
                list: []
            },
            days: {
                l: false,
                k: false,
                m: false,
                j: false,
                v: false,
                s: false,
                d: false
            }
        }
    },
    computed: {
        ...Vuex.mapState(['commands', 'config']),
        courses () {
            return this.$store.state.schedule.courses
        },
        firstHourComputed() {
            if (this.init == -1) {
                return this.config.firstHour
            }else{
                return this.init + this.config.firstHour
            }
        },
        initHours() {
            let list = []
                for (let i = this.config.firstHour; i <= this.config.lastHour; i++) {
                    list.push(this.n(i) + ":00")
                }
            return list
        },
        endHours() {
            let list = []
            for (let i = this.firstHourComputed; i <= this.config.lastHour; i++) {
                list.push(this.n(i) + ":50")
            }
            return list
        },
        datalistCoursesName() {
            let list = []
            let complement = [
                "Artistica",
                "Deportiva",
                "Matemáticas",
                "Humanidades I",
                "Humanidades II",
                "Laboratorio",
                "Repertorio"
            ]
            
            list = this.courses.map(v => v.name)

            list.reverse()

            for (let course of complement) {
                if (!list.includes(course)) {
                    list.push(course)
                }
            }
            return list
        }
    },
    methods: {
        ...Vuex.mapMutations(['addCourse', 'updateCourse']),
        add() {
            // if (useGoogle)
            //     ga('send', 'event', 'curso', 'agregar', 'tiempo', Math.floor (Date.now() / 1000) - this.initApp )
            let errors = []
            let d = this.days
            let totalHours = this.config.lastHour - this.config.firstHour

            if(this.name.trim() == '') {
                errors.push('Debe asignar un nombre al curso')
            }

            if(!(d.l || d.k || d.m || d.j || d.v || d.s || d.d)) {
                errors.push('Debe seleccionar al menos un día')
            }

            if(this.init < 0 || this.init > totalHours) {
                errors.push('Debe seleccionar una hora de inicio')
            }

            if(this.end < 0 || this.end > totalHours) {
                errors.push('Debe seleccionar una hora de finalización')
            }

            let course
            let update = false
            let times = []

            for (let c of this.courses) {
                if (c.name == this.name.trim()) {
                    update = true
                    course = JSON.parse(JSON.stringify(c))
                }
            }

            if(course == null) {
                course = {
                    name: this.name.trim(),
                    times: [],
                    color: this.color
                }
            }

            for (let day in this.days) {
                if(this.days[day]) {
                    times.push({
                        init: this.rowToHour(this.init, '00'),
                        end: this.rowToHour(this.end, '50'),
                        day: day
                    })
                }
            }

            if(errors.length == 0 ) {
                let conflicts = this.colision(times)

                if(conflicts.state) {
                    console.log(conflicts)
                    let text
                    for (let c of conflicts.with) {
                        text = 'El horario escogido interfiere con el de ' + c.name + ' el ' + this.letterDayToName(c.time.day) + ', en el horario de las ' + c.time.init + ' a las ' + c.time.end
                        errors.push(text)
                    }
                }
            }

            

            if(errors.length == 0) {
                course.times = course.times.concat(times)
                
                if(update) {
                    this.compressHours(course)
                    this.updateCourse(course)
                }else{
                    this.addCourse(course)
                }
                this.clear()
            }else{
                this.showError (errors )
            }

        },
        n (num) {
            if (num<10) {
                return '0'+num
            }
            return num
        },
        hourToRow(hour) {
            let h = parseInt(hour.split(':')[0])
            return h - this.config.firstHour
        },
        rowToHour(row, end) {
            return this.n(row + this.config.firstHour) + ':' + end
        },
        colision(times) {
            let conflicts = []
            for (let c of this.courses) {
                for (let t of c.times) {
                    for (let time of times) {
                        if (t.day === time.day) {
                            if (!(time.init<t.init && time.init<t.end && time.end<=t.init && time.end<t.end || time.init>t.init && time.init>=t.end && time.end>t.init && time.end>t.end)) {
                                conflicts.push({
                                    name: c.name,
                                    time: t,
                                    obj: c
                                })
                            }
                        }
                    }
                }
            }
            return {
                state: conflicts.length > 0,
                with: conflicts
            }
        },
        clear(){
            this.name = ''
            this.init = -1
            this.end = -1

            for (let day in this.days) {
                if(this.days[day]){
                    this.days[day] = false
                }
            }
        },
        compressHours(course){
            for (var time of course.times) {
                for (var time2 of course.times) {
                    if (time != time2 && time.day == time2.day) {
                        let t1i = this.hourToRow(time.init)
                        let t1e = this.hourToRow(time.end)
                        let t2i = this.hourToRow(time2.init)
                        let t2e = this.hourToRow(time2.end)

                        if(t1e + 1 == t2i || t2e + 1 == t1i){
                            if(t1i < t2i){
                                time.end = time2.end
                                this.removeElementToArray(course.times, time2)
                            }else{
                                time2.end = time.end
                                this.removeElementToArray(course.times, time)
                            }
                        }else if(t1i < t2i && t1e > t2e){
                            this.removeElementToArray(course.times, time2)
                        }
                    }
                }
            }
            return course
        },
        removeElementToArray(array, element){
            let index = array.indexOf(element)
            if (index > -1) {
                array.splice(index, 1)
            }
        },
        showError (errors){
            this.error.list = errors
        },
        letterDayToName(letter){
            let map = {
                l: 'lunes',
                k: 'martes',
                m: 'miércoles',
                j: 'jueves',
                v: 'viernes',
                s: 'sábado',
                d: 'domingo'
            }
            return map[letter]
        }
    },
    watch: {
        name (value) {
            if (value == 'color lol'){
                this.$store.commit('lol')
            }else{
                if(this.commands.lol){
                    this.$store.commit('lol', false)
                }
            }
        }
    }
}
</script>
<style lang="scss">
    .course-panel{
        background: var(--color);
        color: white;
        border: 3px solid var(--secondary);
        padding: 5px;
        text-align: center;
    }
</style>
