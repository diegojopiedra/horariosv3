<template>
    <nav class="row-s nav deep-2 secondary">
        <modal :open="localModal.config" @close="localModal.config = false" >
          <div class="card primary text-white m-b">
            <h1 class="modal__title"><i class="fa fa-cog"></i> Configuración</h1>
            <div class="card secondary text-grey">
              <div class="modal__text">
                <div class="primary">
                  <input type="checkbox" id="coursesAsBlock" class="form__checkbox primary" v-model="coursesAsBlock">
                  <label for="coursesAsBlock" class="form__label">Ver cursos como bloque</label>
                </div>
                <div class="primary">
                  <input type="checkbox" id="colorEditor" class="form__checkbox primary" v-model="colorEditor">
                  <label for="colorEditor" class="form__label">Paleta de colores</label>
                </div>
              </div>
            </div>
          </div>
        </modal>
        <alert :message="linkMessage" title="Link" type="message"></alert>
        <!-- <div class="col xs-24 show-max-sm primary">
          <button class="nav__btn text-center" id="menu-toggle">
              <i class="fa fa-bars" aria-hidden="true"></i> Menu
          </button>
        </div> -->
        <ul class="col xs-24 nav__list primary" id="menu">
        <li class="nav__item">
            <button class="nav__btn" @click="createNewSchedule()">
            <i class="fa fa-table" aria-hidden="true"></i><span class="show-min-md"> Crear nuevo horario</span>
            </button>
        </li>
        <li class="nav__item">
            <button class="nav__btn">
            <i class="fa fa-save" aria-hidden="true"></i><span class="show-min-md"> Guardar como ...</span> <i class="fa fa-indicator fa-chevron-down"></i>
            </button>
            <div class="nav__submenu deep-2">
            <ul>
                <li class="nav__item">
                <button class="nav__btn save" :disabled="this.saving" @click="saveAsLink()">
                    <i class="fa fa-link"></i>Link
                </button>
                </li>
                <li class="nav__item" v-if="commands.yul">
                <button class="nav__btn save" :disabled="this.saving" @click="downloadImage()">
                    <i class="fa fa-picture-o"></i> Imagen
                </button>
                </li>
                <li class="nav__item" v-if="commands.yul">
                <button class="nav__btn save" :disabled="this.saving" @click="downloadPDF()">
                    <i class="fa fa-file-pdf-o"></i> PDF
                </button>
                </li>
                <li class="nav__item">
                <button class="nav__btn save" :disabled="this.saving" @click="creatSpreadsheet('ods', 'horarios.ods')">
                    <i class="fa fa-file-text-o"></i> Hoja de cálculo (ODS)
                </button>
                </li>
                <li class="nav__item">
                <button class="nav__btn save" :disabled="this.saving" @click="creatSpreadsheet('xlsx', 'horarios.xlsx')">
                    <i class="fa fa-file-text-o"></i> Hoja de cálculo (XLSX)
                </button>
                </li>
                <li class="nav__item">
                <button class="nav__btn save" :disabled="this.saving" @click="print()">
                    <i class="fa fa-print"></i> Imprimir
                </button>
                </li>
            </ul>
            </div>
        </li>
        <li class="nav__item">
          <button class="nav__btn" @click="localModal.config = true">
            <i class="fa fa-cog"></i><span class="show-min-md"> Configuración </span>
          </button>
        </li>
        <li class="nav__item">
            <button class="nav__btn">
            <i class="fa fa-info-circle"></i><span class="show-min-md"> Información</span><i class="fa fa-indicator fa-chevron-down"></i>
            </button>
            <div class="nav__submenu deep-2">
            <ul>
                <li class="nav__item">
                <button class="nav__btn" @click="modals.colab = true">
                    <i class="fa fa-users"></i>Acerca de colaboradores
                </button>
                </li>
                <li class="nav__item">
                <button class="nav__btn" @click="modals.dev = true">
                    <i class="fa fa-code"></i>Librerías de desarrollo
                </button>
                </li>
                <li class="nav__item">
                <button class="nav__btn" @click="modals.terms = true">
                    <i class="fa fa-file"></i>Términos y condiciones de uso
                </button>
                </li>
                <li class="nav__item">
                <button class="nav__btn" @click="modals.law = true">
                    <i class="fa fa-gavel"></i>Política de privacidad
                </button>
                </li>
            </ul>
            </div>
        </li>
        <li class="nav__item">
            <button class="nav__btn" @click="modals.help = true">
              <i class="fa fa-question-circle"></i><span class="show-min-md"> Ayuda</span>
            </button>
        </li>
        <!-- <li class="nav__item">
            <button class="nav__btn">
            <i class="fa fa-hand-peace-o"></i> ¿Nos ayudas?
            </button>
        </li> -->
        <li class="nav__item">
            <button class="nav__btn text-cta-f" @click="modals.gifts = true">
              <i class="fa fa-gift"></i><span class="show-min-md"> ¡Regalos GRATIS!</span>
            </button>
        </li>
        </ul>
        <v-iframe
        class="show-min-sm"
        src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGenerador-de-Horarios%2F711418525589252&amp;width&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=35&amp;appId=246974068650566"
        scrolling="no"
        frameborder="0"
        style="overflow: hidden;position: absolute;right: 0px;padding: 12px;height: 51px;"
        allowTransparency="true"></v-iframe>
    </nav>
</template>
<script>
import Vuex from 'vuex'
import VIframe from '@/components/VIframe'
import Alert from '@/components/Alert'
import Modal from '@/components/Modal'
import XLSX from 'xlsx'
import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'

export default {
    name: 'EditorMenu',
    components: {
      VIframe,
      Alert,
      Modal
    },
    data () {
      return {
        defaultLinkMessage: 'Creando nuevo link ...',
        linkMessage: '',
        localModal: {
          config: false
        }
      }
    },
    computed: {
        ...Vuex.mapState(['commands', 'saving', 'schedule', 'config']),
        modals: {
            set: function(value) {
                this.$store.commit('setModals', value)
            },
            get: function() {
                return this.$store.state.modals
            }
        },
        coursesAsBlock: {
          set: function(value) {
                this.$store.commit('setCoursesAsBlock', value)
          },
          get: function() {
              return this.config.coursesAsBlock
          }
        },
        colorEditor: {
          set: function(value) {
                this.$store.commit('setColorEditor', value)
          },
          get: function() {
              return this.commands.colorEditor
          }
        }
    },
    methods: {
      ...Vuex.mapMutations(['clearSchedule']),
      ...Vuex.mapActions(['saveScheduleOnline']),
      saveAsLink () {
        this.$store.commit('saving', true)
        if (this.schedule.courses.length > 0) {
          this.linkMessage = this.defaultLinkMessage
          let prom = this.saveScheduleOnline()
          prom.then(() => {
            this.$router.push({name: 'editor-params', params:{'schedule_id': this.schedule.id}})
            this.linkMessage = 'El nuevo link es: https://horarios.coldideas.com/editor/' + this.schedule.id
            this.commit('saveSchedule')
            this.$store.commit('saving', false)
          })
        }else{
          this.linkMessage = 'El nuevo link es: https://horarios.coldideas.com'
          this.$store.commit('saving', false)
        }
      },
      createNewSchedule () {
        if(!this.schedule.saved){
          alert('Debes guardar')
        }else{
          this.clearSchedule()
          this.$router.push('/')
        }
      },
      print () {
        this.$store.commit('saving', true)
        print()
        this.$store.commit('saving', false)
      },
      creatSpreadsheet(type, name) {
        this.$store.commit('saving', true)
        let el = document.getElementById('main-table')
        let wb = XLSX.utils.table_to_book(el, {sheet:"Sheet JS", raw:true})
        // if(useGoogle)
        //   ga('send', 'event', 'guardar_como', 'hoja_' + type, 'tiempo', Math.floor(Date.now() / 1000) - this.initApp)
        
        this.$store.commit('saving', false)
        return XLSX.writeFile(wb, name , {cellStyles:true})
      },
      downloadImage(){
        this.$store.commit('saving', true)
        let prom = this.createCanvas()
        prom.then(()=>{
          this.convertCanvasToImageAndDownload()
        })
      },
      createCanvas(){
        let table = document.getElementById('main-table')
        table.classList.add('table__toImage')
        // eslint-disable-next-line
        let prom = html2canvas(table).then(canvas => {
            document.getElementById('canvasContainer').appendChild(canvas)
            table.classList.remove('table__toImage')
        })
        return prom
      },
      convertCanvasToImageAndDownload(){
        let link = document.getElementById('canvasAction')
        link.setAttribute('download', 'Horario.png')
        link.setAttribute('href', this.getCanvasAtImage())
        link.click()

        this.$store.commit('saving', false)
        // if(useGoogle)
        //   ga('send', 'event', 'guardar_como', 'imagen', 'tiempo', Math.floor(Date.now() / 1000) - this.initApp)
      },
      getCanvasAtImage(base64 = false){
        let obj = document.getElementById('canvasContainer').lastChild.toDataURL("image/png")
        if(!base64){
          obj = obj.replace("image/png", "image/octet-stream")
        }
        return obj
      },
      downloadPDF(){
        this.$store.commit('saving', true)
        let prom = this.createCanvas()
        prom.then(()=>{
          let pdf = new jsPDF('l', 'pt', 'letter')
          let width = pdf.internal.pageSize.getWidth()
          // let height = pdf.internal.pageSize.getHeight()
          let ratio = document.getElementById('canvasContainer').firstChild.height / document.getElementById('canvasContainer').firstChild.width

          let height = ratio * width

          pdf.addImage(this.getCanvasAtImage(true), 'PNG', 15, 15, width-30, height+15)
          pdf.save('Horario.pdf')
          this.$store.commit('saving', false)
          // if(useGoogle)
          //   ga('send', 'event', 'guardar_como', 'pdf', 'tiempo', Math.floor(Date.now() / 1000) - this.initApp)
        })
      }
    },
    mounted () {
      document.addEventListener('click', e => {
        if (e.target.classList.contains('save')){
          e.target.blur()
        }
      })
    }
}
</script>
<style lang="scss">
.nav{
  background: var(--color);
  color: var(--grey);
  line-height: 45px;
  font-size: 0.8125em;
}

.nav .fa{
  font-size: 16px;
  margin-right: 10px;
}

.nav .fa-indicator{
  margin-right: 0;
  margin-left: 10px;
  font-size: 9px;
  position: relative;
  top: -1px;
}

.nav__item{
  display: inline-block;
  border-style: solid;
  border-color: rgba(0,0,0,.1);
  border-right-width: 1px;
  float: left;
  padding: 3px;
}

.nav__item:hover>.nav__btn,
.nav__item:focus-within>.nav__btn {
  color: white;
  background: var(--color);
  transition: background 0.4s,color 0.4s;
}

.nav__btn{
  padding: 0 10px;
  line-height: inherit;
  width: 100%;
  text-align: left;
  font-size: inherit;
}

.nav__btn:disabled{
  opacity: .5;
  cursor: default;
}

.nav__submenu{
  margin-top: 10px;
  min-width: 200px;
  position: absolute;
  background: var(--secondary);
  margin-left: -3px;
  transform-origin: top;
  transform: perspective(400px) rotateX(-90deg);
  top: 100%;
  z-index: 1;
}

.nav :hover>.nav__submenu,
.nav :focus-within>.nav__submenu{
  top: auto;
  transform: rotateX(0deg);
  transition: transform .4s;
}

.nav__submenu::before{
  content: '';
  position: absolute;
  bottom: 100%;
  left: 24px;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--secondary);
  border-left: 5px solid transparent;
}

.nav__submenu::after{
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 10px;
  background: transparent;
}

.nav__submenu .fa-indicator {
  top: 0;
  float: right;
  display: block;
  line-height: inherit;
}

.nav__submenu .nav__item{
  border-style: solid;
  border-color: rgba(0,0,0,.1);
  border-right-width: 0;
  border-bottom-width: 1px;
  display: block;
  float: none;
}

.nav__submenu .nav__item:last-child{
  border: none;
}

// @media screen and (max-width: map-get($breakpoints, 'sm')){
//   .nav__item{
//     width: 100%;
//     border-bottom-width: 1px;
//     border-right-width: 0px;
//   }

//   .nav__submenu{
//     margin-left: var(--margin);
//     width: 80%;
//   }

//   .nav__list{
//     height: 0px;
//     overflow: hidden;
//     transition: .4s;
//   }

//   .menu-open{
//     height: 100vh;
//   }
// }
</style>