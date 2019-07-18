import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      firstHour: 7,
      lastHour: 22,
      days: {
        l: false,
        k: false,
        m: false,
        j: false,
        v: false,
        s: false,
        d: false
      },
      coursesAsBlock: true
    },
    schedule: {
      id: '',
      name: '',
      courses: [],
      saved: true
    },
    commands: {
      style: false,
      lol: false,
      colorEditor: true,
      yul: true
    },
    loadingSchedule: false,
    saving: false,
    server: 'https://horarios.coldideas.com/php/url.php',
    // server: 'http://localhost/server-fake/schedule.php',
    modals: {
      error: false,
      colab: false,
      help: false,
      newSchedule: false,
      dev: false,
      terms: false,
      law: false,
      link: false,
      gifts: false
    }
  },
  mutations: {
    clearSchedule (state) {
      state.schedule = {
        id: '',
        name: '',
        courses: [],
        saved: true
      }
    },
    saveSchedule (state) {
      state.schedule.saved = true
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    setSchedule(state, {name, id, courses}){
      state.schedule.id = id
      state.schedule.name = name
      state.schedule.courses = courses
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    setCourses (state, courses){
      state.schedule.courses = courses
      state.schedule.saved = false
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    setName (state, name){
      state.schedule.name = name
      state.schedule.saved = false
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    setId (state, id){
      state.schedule.id = id
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    updateCourse(state, course){
      for (let i = 0; i < state.schedule.courses.length; i++) {
        let c = state.schedule.courses[i]
        if (c.name == course.name){
          state.schedule.courses[i].color = course.color
          state.schedule.courses[i].times = course.times
          state.schedule.saved = false
          break
        }
      }
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    removeCourse(state, course){
      let index = state.schedule.courses.indexOf(course)
      if (index > -1) {
        state.schedule.courses.splice(index, 1)
      }
      state.schedule.saved = false
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    addCourse (state, course){
      state.schedule.courses.push(course)
      state.schedule.saved = false
      localStorage.schedule = JSON.stringify(state.schedule)
    },
    setLoadingSchedule(state, value){
      state.loadingSchedule = value
    },
    lol (state, value = true) {
      state.commands.lol = value
    },
    setModals (state, modals) {
      state.modals = modals
    },
    saving (state, value) {
      state.saving = value
      if(value){
        state.schedule.saved = true
      }
    },
    loadLocalStorageSchedule (state) {
      state.schedule = JSON.parse(localStorage.schedule)
    },
    setCoursesAsBlock (state, value) {
      state.config.coursesAsBlock = value
    },
    setColorEditor (state, value) {
      state.commands.colorEditor = value
    }
  },
  actions: {
    loadSchedule: async function ({ commit, state }, id) {
      commit('setLoadingSchedule', true)
      let data = {
        action: 7,
        id
      }

      let formData = new FormData()

      for (let n in data) {
        formData.append(n, data[n])
      }

      const response = await fetch(state.server,
      {
          body: formData,
          method: "post"
      })

      let schedule = await response.json()

      if((typeof schedule) != 'object'){
        schedule = JSON.parse(schedule)
      }
      
      commit('setLoadingSchedule', false)
      if(Array.isArray(schedule)){
        commit('setId', id)
        commit('setCourses', schedule)
      }else{
        commit('setSchedule', schedule)
      }
      
      commit('saveSchedule')
    },
    saveScheduleOnline: async function ({commit, state}){
      let temp = JSON.parse(JSON.stringify(state.schedule))

      delete temp.id
      let data = {
        action: 6,
        arrayData: JSON.stringify(temp),
        pass: 0
      }

      let formData = new FormData()

      for (let n in data) {
        formData.append(n, data[n])
      }

      const result = await fetch(state.server,
      {
          body: formData,
          method: "post"
      })
      
      const obj = await result.json()
      
      commit('setId', obj.url)
    }
  }
})
