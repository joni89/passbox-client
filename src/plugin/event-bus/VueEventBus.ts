import EventBus from '@/plugin/event-bus/EventBus';
import Vue, {PluginObject} from 'vue';
import {Dictionary, Listener} from '@/plugin/event-bus/types';

export const eventBus = new EventBus();

type EventBusListeners = Dictionary<string | Listener>;

interface VueComponentPrototype {
	eventBusListeners?: EventBusListeners;
}

function ListenTo(event: string) {
	return (target: VueComponentPrototype, propertyKey: string, descriptor: PropertyDescriptor) => {
		if (!target.eventBusListeners) {
			target.eventBusListeners = {};
		}
		target.eventBusListeners[event] = propertyKey;
	};
}

export {
	ListenTo
};

interface VueEventBusOptions {
	name: string;
}

type SelfType = Vue & Dictionary<Listener>;

const VueEventBus: PluginObject<VueEventBusOptions> = {

	install(vue: typeof Vue) {

		Object.defineProperty(Vue.prototype, '$eventBus', {
			writable: false,
			value: eventBus
		});

		Vue.mixin({
			mounted(this: SelfType) {

				if (!this.eventBusListeners) {
					return;
				}

				Object.entries(this.eventBusListeners)
					.forEach(([event, listener]) => {
						if (typeof listener === 'string') {
							const listenerFunction = this[listener];
							eventBus.on(event, listenerFunction);
						} else {
							eventBus.on(event, listener);
						}
					});
			},
			beforeDestroy(this: SelfType) {

				if (!this.eventBusListeners) {
					return;
				}

				Object.entries(this.eventBusListeners)
					.forEach(([event, listener]) => {
						if (typeof listener === 'string') {
							const listenerFunction = this[listener];
							eventBus.off(event, listenerFunction);
						} else {
							eventBus.off(event, listener);
						}
					});
			}
		});

	}

};

export default VueEventBus;

declare module 'vue/types/vue' {

	interface Vue {
		eventBusListeners?: EventBusListeners;
		$eventBus: EventBus;
	}

}
