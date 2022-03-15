<template>
<div class="text-center section ">
  <h2 class="h2 mt-5">Canlendar</h2>

  <calendar class="my-calendar mx-0 my-0" :masks="masks" :attributes="attributes" disable-page-swipe is-expanded>
    <template v-slot:day-content="{ day, attributes }">
      <div class="custom-day">
        <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
        <div class="d-flex  my-attr my-btn   text-truncate">
          <p v-for="attr in attributes" :key="attr.key" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 " :class="attr.customData.class">
            <span class="">{{ attr.customData.title }} </span>

          </p>
        </div>
      </div>
    </template>
  </calendar>

</div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
import axios from 'axios';

// import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  components: {
    Calendar,
    // DatePicker
  },
  data() {
 
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes: [
      ],
    };
  },
  mounted() {
    this.getTask()
  },
  methods: {
    async getTask() {
      const {
        data
      } = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API}/task/user/${this.$route.params.userId}`,

      })

      this.mapData(data)
    },
    mapData(data) {
      for (let e of data) {
        this.attributes.push({
          key: e.taskId,
          customData: {
            title: e.title,
            class: 'my-task',
          },
          dates: e.endDate,

        })
      }

    }
  }

};
</script>

<style scoped>
.my-task {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(207, 14, 14);
  border-radius: 20px;

}

.my-calendar {
  max-width: 25rem;

}

.my-attr {
  padding: 2px;
  font-size: 0.6rem;
}

.custom-day {
  border: solid rgb(209, 209, 209) 1px;
  height: 5rem;
  margin: 1px;
  border-radius: 10px;
}

@media screen and (max-width: 400px) {
  .my-attr {
    width: 2.5rem;
    font-size: 0.6rem;
  }

}

.my-task:hover {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(173, 98, 98);
  border-radius: 20px;
  cursor: pointer;
}
</style>
