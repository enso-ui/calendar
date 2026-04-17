<template>
    <div class="wrapper">
        <div class="columns">
            <div class="column is-2-desktop is-8-tablet is-12-mobile">
                <calendar-filter @change-date="selectedDate = $event"
                    @update-selection="calendars = $event;"/>
            </div>
            <div class="column is-10-desktop is-12-tablet is-12-mobile">
                <enso-calendar :date="selectedDate"
                    :calendars="calendars"
                    ref="calendar"
                    @edit-event="event = $event || {}"/>
            </div>
        </div>
        <event-form :event="event"
            @submit="reloadEvents"
            @close="event = null"
            @destroy="reloadEvents"
            v-if="event"/>
    </div>
</template>

<script>
import EnsoCalendar from './components/EnsoCalendar.vue';
import CalendarFilter from './components/CalendarFilter.vue';
import EventForm from './components/EventForm.vue';
import { layout } from '@enso-ui/ui/src/pinia/layout';

export default {
    name: 'Index',

    components: { EnsoCalendar, CalendarFilter, EventForm },

    inject: ['errorHandler', 'route'],

    data: () => ({
        event: null,
        selectedDate: null,
        calendars: [],
    }),

    created() {
        layout().hideFooter();
    },

    beforeUnmount() {
        layout().showFooter();
    },

    methods: {
        reloadEvents() {
            this.$refs.calendar.fetch();
            this.event = null;
        },
    },
};
</script>
<style lang="scss">
@import 'vue-cal/dist/vuecal.css';
</style>
