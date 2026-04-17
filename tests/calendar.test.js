import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { enums } from '@enso-ui/enums/src/pinia/enums';
import { layout } from '@enso-ui/ui/src/pinia/layout';
import { preferences } from '@enso-ui/ui/src/pinia/preferences';

vi.mock('vue-cal', () => ({
    default: { name: 'VueCal' },
}));

vi.mock('@enso-ui/filters/renderless', () => ({
    FilterState: { name: 'FilterState' },
}));

vi.mock('@enso-ui/forms/bulma', () => ({
    EnsoForm: { name: 'EnsoForm' },
    FormField: { name: 'FormField' },
}));

vi.mock('@enso-ui/modal/bulma', () => ({
    Modal: { name: 'Modal' },
}));

vi.mock('@enso-ui/datepicker/bulma', () => ({
    EnsoDatepicker: { name: 'EnsoDatepicker' },
}));

vi.mock('@enso-ui/transitions', () => ({
    Fade: { name: 'Fade' },
}));

vi.mock('../src/bulma/pages/calendar/components/CalendarForm.vue', () => ({
    default: { name: 'CalendarForm' },
}));

vi.mock('../src/bulma/pages/calendar/components/ColorSelect.vue', () => ({
    default: { name: 'ColorSelect' },
}));

vi.mock('../src/bulma/pages/calendar/components/EventConfirmation.vue', () => ({
    default: { name: 'EventConfirmation' },
}));

const { default: CalendarFilter } = await import('../src/bulma/pages/calendar/components/CalendarFilter.vue');
const { default: EnsoCalendar } = await import('../src/bulma/pages/calendar/components/EnsoCalendar.vue');
const { default: EventForm } = await import('../src/bulma/pages/calendar/components/EventForm.vue');
const { default: Index } = await import('../src/bulma/pages/calendar/Index.vue');

describe('calendar cleanup', () => {
    beforeEach(() => {
        setActivePinia(createPinia());

        preferences().$patch({
            global: { lang: 'ro' },
        });

        enums().$patch({
            enums: { eventFrequencies: { Once: 'once' } },
        });
    });

    it('resolves the calendar locale from preferences', () => {
        expect(CalendarFilter.computed.calendarLocale.call({})).toBeTruthy();
    });

    it('detects recurring events from enums store', () => {
        expect(EnsoCalendar.computed.isFrequent.call({
            event: { frequency: 'weekly' },
        })).toBe(true);

        expect(EnsoCalendar.computed.isFrequent.call({
            event: { frequency: 'once' },
        })).toBe(false);
    });

    it('asks for confirmation only for recurring edited events', () => {
        expect(EventForm.methods.needConfirm.call({
            event: { frequency: 'weekly' },
            isEdit: true,
        }, undefined)).toBe(true);

        expect(EventForm.methods.needConfirm.call({
            event: { frequency: 'once' },
            isEdit: true,
        }, undefined)).toBe(false);
    });

    it('toggles the footer through the layout store', () => {
        const hideFooter = vi.fn();
        const showFooter = vi.fn();

        layout().hideFooter = hideFooter;
        layout().showFooter = showFooter;

        Index.created.call({});
        Index.beforeUnmount.call({});

        expect(hideFooter).toHaveBeenCalledOnce();
        expect(showFooter).toHaveBeenCalledOnce();
    });
});
