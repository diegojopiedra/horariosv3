<template>
    <modal :open="open" @close="$emit('close')" class="hide">
        <div class="card primary text-white m-b row">
            <div class="col xs-24">
                <h1 class="modal__title">Ayuda</h1>
            </div>
            <div class="col xs-24">
                <div class="card secondary text-grey">
                    A continuación se brindará una breve explicación sobre el proceso que se debe seguir para poder guardar o bien crear un nuevo horario. Para garantizar un correcto resultado se recomienda al usuario seguir al pie de la letra las siguientes indicaciones.
                </div>
                </div>
                <div class="col xs-24">
                <div class="card secondary text-grey">
                    <h2 class="help__title">1) Ingresa el nombre del curso que quieras almacenar.</h2>
                    <img class="help__img" src="../assets/help/01.png">
                </div>
                </div>
                <div class="col xs-24">
                <div class="card secondary text-grey">
                    <h2 class="help__title">2) Selecciona el día que se impartirá dicho curso.</h2>
                    <img class="help__img" src="../assets/help/02.png">
                </div>
                </div>
                <div class="col xs-24">
                <div class="card secondary text-grey">
                    <h2 class="help__title">3) Selecciona una hora de inicio y de fin del curso.</h2>
                    <img class="help__img" src="../assets/help/03.png">
                </div>
                </div>
                <div class="col xs-24">
                <div class="card secondary text-grey">
                    <h2 class="help__title">4) Da click en el botón "Agregar".</h2>
                    <img class="help__img" src="../assets/help/04.png">
                </div>
                </div>
                <div class="col xs-24">
                <div class="card secondary text-grey">
                    <h2 class="help__title">5) Repite el proceso las veces que sean necesarias.</h2>
                    <img class="help__img" src="../assets/help/05.png">
                </div>
                </div>
                <div class="col xs-24">
                <div class="card secondary text-grey">
                    <h2 class="help__title">6) Cuando tu horario esté listo para guardarse, selecciona la opción del menú "Guardar como..."y puedes elegir entre alguna de las siguientes opciones:</h2>
                    <!-- <ul>
                    <li>Link</li>
                    <li>Imagen</li>
                    <li>PDF</li>
                    <li>Hoja de cálculo (ODS)</li>
                    <li>Hoja de cálculo (XLSX)</li>
                    <li>Imprimir</li>
                    </ul> -->
                    <img class="help__img hide" src="../assets/help/06.png" id="yul-off">
                    <img class="help__img hide" src="../assets/help/06.1.png" id="yul-on">
                </div>
            </div>
        </div>
    </modal>
</template>
<script>
import Modal from '@/components/Modal'

export default {
    name: 'Help',
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
<style lang="scss">
.help{
  color: var(--grey);
  margin-top: var(--margin);
  margin-bottom: var(--margin);
  text-align: center;
}

.help__title{
  font-weight: bold;
  margin-top: var(--margin);
  margin-bottom: var(--margin);
}

.help__img{
  max-width: 100%;
}
</style>
