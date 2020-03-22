import {Vue} from 'vue/types/vue';

export default interface GenericForm<T> extends Vue {
	serializeFormData(): T;

	clearFormData(): void;
}
