<template>
	<v-form
			ref="form"
			v-model="valid"
			lazy-validation
	>

		<v-text-field
				v-model="username"
				:counter="100"
				label="Usuario"
				required
		/>

		<v-text-field
				v-model="password"
				:type="showingPassword ? 'text' : 'password'"
				:counter="100"
				label="Contraseña"
				required
				:append-icon="showingPassword ? 'mdi-eye' : 'mdi-eye-off'"
				@click:append="showingPassword = !showingPassword"
		/>

		<v-text-field
				v-model="description"
				:counter="100"
				label="Descripción"
				required
		/>

		<v-text-field
				v-model="url"
				:counter="100"
				label="URL"
				required
		/>

		<v-text-field
				v-model="comments"
				:counter="100"
				label="Comentarios"
				required
		/>

	</v-form>
</template>

<script lang="ts">
	import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
	import Credentials from '@/model/Credentials';
	import GenericForm from '@/components/GenericForm';

	@Component({
		components: {}
	})
	export default class CredentialsForm extends Vue implements GenericForm<Credentials> {

		@Prop({
			type: Object,
			default: null
		})
		private item!: Nullable<Credentials>;

		private valid: boolean = false;
		private loading: boolean = false;

		private showingPassword: boolean = false;

		private id: Nullable<number> = null;
		private description: string = '';
		private username: string = '';
		private password: string = '';
		private url: string = '';
		private comments: string = '';

		private mounted(): void {
			this.onItemChange(this.item);
		}

		@Watch('item')
		private onItemChange(item: Nullable<Credentials>) {
			if (item == null) {
				this.clearFormData();
			} else {
				this.fillFormData(item);
			}
		}

		private fillFormData(item: Credentials) {
			this.id = item.id;
			this.description = item.description || '';
			this.username = item.username;
			this.password = item.password;
			this.url = item.url || '';
			this.comments = item.comments || '';
		}

		public clearFormData() {
			this.id = null;
			this.description = '';
			this.username = '';
			this.password = '';
			this.url = '';
			this.comments = '';
		}

		public serializeFormData(): Credentials {
			return {
				id: this.id || undefined,
				description: this.description || undefined,
				username: this.username,
				password: this.password,
				url: this.url || undefined,
				comments: this.comments || undefined
			};
		}

	}
</script>
