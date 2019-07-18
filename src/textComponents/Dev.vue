<template>
    <modal :open="open" @close="$emit('close')" class="hide">
        <div class="card primary text-white m-b row">
          <div class="col xs-24">
            <h1 class="modal__title"><i class="fa fa-code"></i> Librerías de desarrollo</h1>
          </div>
          <div class="card secondary text-grey col xs-24">
            <p class="modal__text m-b">
              A continuación se hace una atribución pública como agradecimiento a las librerías que han sido utilizadas para la creación de este proyecto.
            </p>
          </div>
          <div class="card secondary text-grey col xs-24 md-12" :key="'lib-' + lib.name" style="text-align: center" v-for="lib in libs">
            <h2 class="modal__title">{{lib.name}}</h2>
            <p class="modal__text">{{lib.desc}}</p>
            <a :href="lib.link" target="_blank" class="text-primary-f">{{lib.link}}</a>
          </div>
        </div>
    </modal>
</template>
<script>
import Modal from '@/components/Modal'

export default {
    name: 'Dev',
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Modal
    },
    data () {
        return {
            libs: [
                {
                name: 'Vue JS',
                desc: 'Vue es un framework progresivo para la construcción de interfaz de usuario.',
                link: 'https://vuejs.org/',
                image: ''
                },
                {
                name: 'Font Awesome',
                desc: 'Font Awesome ofrece íconos vectoriales escalables.',
                link: 'https://fontawesome.com/v4.7.0/',
                image: ''
                },
                {
                name: 'jsPDF',
                desc: 'Solución de cliente HTML5 para generar archivos PDF.',
                link: 'https://parall.ax/products/jspdf',
                image: ''
                },
                {
                name: 'SheetJS',
                desc: 'Librería para generación de hojas de cálculo con JavaScript.',
                link: 'https://sheetjs.org/',
                image: ''
                },
                {
                name: 'html2canvas',
                desc: 'Librería para conversión de html en un elemento canvas.',
                link: 'https://html2canvas.hertzen.com/',
                image: ''
                }
            ]
        }
    }
}
</script>