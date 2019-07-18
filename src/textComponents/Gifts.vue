<template>
    <modal :open="open" @close="$emit('close')" class="hide">
         <div class="card primary text-white m-b row">
            <div class="col xs-24">
                <h1 class="modal__title">¿Cómo obtener regalos?</h1>
                <p style="line-height: 1.5em;font-family: Lora, serif;font-size: 1.1em;">
                    Obtener regalos del generador de horarios es muy sencillo, solo tienes que seguir el prefil de facebook de nuestra diseñadora gráfica <a href="https://fb.com/yuliavilaart" class="text-primary-f dark-theme__text-white bg-secondary" style="padding:3px;font-weight: bold;font-family: 'Open Sans',sans-serif;" target="_blank">fb.com/yuliavilaart</a> quien comparte códigos para obtener EasterEgss y funcionalidades exclusivas, algunas por tiempo limitado o incluso reservadas solo para unos cuantos usuarios.
                </p>
                <a href="https://fb.com/yuliavilaart" target="_blank" class="btn mb mt"><i class="fa fa-gift"></i> Vamos a buscar regalos YA</a>
            </div>
        </div>
     </modal>
</template>
<script>
import Modal from '@/components/Modal'

export default {
    name: 'Gifts',
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Modal
    }
}
</script>