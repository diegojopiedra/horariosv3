<template>
    <modal :open="open" @close="$emit('close')" class="hide">
      <div class="card primary text-white m-b">
        <h1 class="modal__title"><i class="fa fa-users"></i> Colaboradores</h1>
        <div class="card secondary text-grey">
          <h2 class="modal__title">Diego Piedra araya</h2>
          <p class="modal__text">
            Dueño y principal desarrollador el sitio.
            <br>
            Estudiante avanzado de la carrera de Informátima Empresarial de la UCR.
          </p>
          <p class="modal__text">
            Contacto:
            <br>
            <i class="fa fa-envelope" aria-hidden="true"></i> <a href="mail:developer.diegopiedra@gmail.com" class="text-primary-f dark-theme__text-white">developer.diegopiedra@gmail.com</a>
          </p>
        </div>
        <div class="card secondary text-grey m-t">
          <h2 class="modal__title">Yulieth Avila Salazar</h2>
          <p class="modal__text">
            Social media manager.
            <br>
            Estudiante de la carrera de Estudia Diseño Gráfico de la UCR.
          </p>
          <p class="modal__text">
            Contacto:
            <br>
            <i class="fa fa-facebook-official" aria-hidden="true"></i> <a href="https://www.facebook.com/yuliavilaart" target="_blank" class="text-primary-f dark-theme__text-white">Yulieth Ávila - Diseño, Ilustración y Fotografía</a>
          </p>
        </div>
        <div class="card secondary text-grey m-t">
          <h2 class="modal__title">Randall Sibaja Rodriguez</h2>
          <p class="modal__text">
            Desarrollador colaborador de la versión 1 del sitio.
            <br>
            Trabajador actual de AKTEK S.A, graduado de la carrera de Informátima Empresarial de la UCR.
          </p>
        </div>
      </div>
    </modal>
</template>
<script>
import Modal from '@/components/Modal'

export default {
    name: 'Colaborators',
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