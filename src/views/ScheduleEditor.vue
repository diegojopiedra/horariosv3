<template>
    <div class="shedule-editor">
        <div class="sticky">
            <editor-menu />
        </div>
        <div class="container">
            <course-panel class="m-b2"></course-panel>
        </div>
        <main class="container" style="overflow-y: auto;">
            <schedule-table id="main-table"></schedule-table>
        </main>
        <input type="text" placeholder="Ejecución de comando" class="form__input form__hide-input dark-theme__text-dark">
        <div class="modal-group">
            <colaborators :open="modals.colab" @close="modals.colab = false"/>
            <law :open="modals.law" @close="modals.law = false"/>
            <dev :open="modals.dev" @close="modals.dev = false"/>
            <help :open="modals.help" @close="modals.help = false"/>
            <terms :open="modals.terms" @close="modals.terms = false"/>
            <gifts :open="modals.gifts" @close="modals.gifts = false"/>
        </div>
        <div class="hide">
            <div id="canvasContainer"></div>
            <a id="canvasAction"></a>
        </div>
    </div>
</template>


<script>
import Vuex from 'vuex'
import CoursePanel from '@/components/CoursePanel'
import ScheduleTable from '@/components/ScheduleTable'
import EditorMenu from '@/components/EditorMenu'
import Colaborators from '@/textComponents/Colaborators'
import Law from '@/textComponents/Law'
import Dev from '@/textComponents/Dev'
import Help from '@/textComponents/Help'
import Terms from '@/textComponents/Terms'
import Gifts from '@/textComponents/Gifts'

export default {
    name: 'SheduleEditor',
    components: {
        CoursePanel,
        ScheduleTable,
        EditorMenu,
        Colaborators,
        Law,
        Dev,
        Help,
        Terms,
        Gifts
    },
    computed: {
        modals: {
            set: function(value) {
                console.log('pasa')
                this.$store.commit('setModals', value)
            },
            get: function() {
                return this.$store.state.modals
            }
        }
    },
    methods: {
      ...Vuex.mapActions(['loadSchedule']),
      ...Vuex.mapMutations(['loadLocalStorageSchedule']),
    },
    mounted () {
        let id = this.$route.params.schedule_id
        if(id != null && id.trim() != ''){
            this.loadSchedule(id)
        }else{
            this.loadLocalStorageSchedule()
        }
    },
    watch: {
        '$route' (to) {
            let id = to.params.schedule_id
            if(id != null && id.trim() != ''){
                this.loadSchedule(id)
            }
        }
    }
}
</script>
