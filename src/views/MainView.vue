<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div>

		<v-data-table
				:headers="headers"
				:items="items"
				:loading="tableLoading"
				must-sort
		>
			<template v-slot:item.actions="{item}">
				<ActionsCell
						:password="item.password"
						@show-password="visiblePassword = item.password"
						@hide-password="visiblePassword = null"
						@copy-password="copyToClipboard(item.password)"
						@edit="editItem(item)"
						@remove="showDeleteDialog(item)"
				></ActionsCell>
			</template>
		</v-data-table>

		<div class="text-right mt-5">
			<v-btn @click="loadItems" color="primary">Recargar</v-btn>
		</div>

		<div class="text-right mt-5">
			<v-btn @click="createItem" color="primary">Login</v-btn>
		</div>

		<v-overlay :value="visiblePassword != null">
			<span class="visible-password-container">
				{{ visiblePassword }}
			</span>
		</v-overlay>

		<v-snackbar
				v-model="successToast"
				:timeout="2000"
				color="green lighten-1"
		>
			Copiado al portapapeles
			<v-btn
					color="green darken-3"
					icon
					@click="successToast = false"
			>
				<v-icon>close</v-icon>
			</v-btn>
		</v-snackbar>

		<v-snackbar
				v-model="errorToast"
				:timeout="2000"
				color="red lighten-2"
		>
			Ha ocurrido un error
			<v-btn
					color="red darken-2"
					icon
					@click="errorToast = false"
			>
				<v-icon>close</v-icon>
			</v-btn>
		</v-snackbar>

		<FormDialog
				title="Editar credenciales"
				:showing.sync="showingCredentialsForm"
				@save="onCredentialsSave"
				@close="onCredentialsFormClose"
		>
			<v-overlay
					:value="formLoading"
					color="white"
					absolute
			>
				<v-progress-circular
						:size="50"
						color="primary"
						indeterminate
				></v-progress-circular>
			</v-overlay>

			<CredentialsForm
					ref="credentialsForm"
					:item="editingItem"
			/>
		</FormDialog>

		<FormDialog
				title="Eliminar"
				saveButtonText="Aceptar"
				:showing.sync="showingDeleteDialog"
				@save="onDeleteConfirm"
				@close="onDeleteDialogClose"
		>
			<v-overlay
					:value="deleteDialogLoading"
					color="white"
					absolute
			>
				<v-progress-circular
						:size="50"
						color="primary"
						indeterminate
				></v-progress-circular>
			</v-overlay>
			<p>Se va a eliminar el elemento seleccionado. ¿Está seguro?</p>
		</FormDialog>

	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import HelloWorld from '@/components/HelloWorld.vue';
	import {DataTableHeader} from '@/VuetifyTypes';
	import Credentials from '@/model/Credentials';
	import {credentialsService} from '@/singletons';
	import ActionsCell from '@/views/ActionsCell.vue';
	import FormDialog from '@/components/FormDialog.vue';
	import CredentialsForm from '@/views/CredentialsForm.vue';
	import {ListenTo} from '@/plugin/event-bus';
	import GenericForm from '@/components/GenericForm';

	@Component({
		components: {
			CredentialsForm,
			FormDialog,
			ActionsCell,
			HelloWorld,
		},
	})
	export default class MainView extends Vue {

		public $refs!: {
			credentialsForm: GenericForm<Credentials>
		};

		private headers: DataTableHeader[] = [
			{text: 'Descripción', value: 'description'},
			{text: 'Usuario', value: 'username'},
			{text: 'URL', value: 'url'},
			{text: 'Comentarios', value: 'comments'},
			{text: 'Acciones', value: 'actions', sortable: false, align: 'center', width: '200px'}
		];

		private tableLoading: boolean = false;
		private formLoading: boolean = false;
		private deleteDialogLoading: boolean = false;

		private items: Credentials[] = [];

		private visiblePassword: Nullable<string> = null;

		private showingCredentialsForm: boolean = false;
		private editingItem: Nullable<Credentials> = null;

		private successToast: boolean = false;
		private errorToast: boolean = false;

		private showingDeleteDialog: boolean = false;
		private deletingItem: Nullable<Credentials> = null;

		private onFormLoginDialog(): void {
			this.tableLoading = true;
			credentialsService.findAll()
				.then(credentials => this.items = credentials)
				.catch(error => alert(error))
				.finally(() => this.tableLoading = false);
		}

		private mounted(): void {
			this.loadItems();
		}

		private loadItems(): void {
			this.tableLoading = true;
			credentialsService.findAll()
				.then(credentials => this.items = credentials)
				.catch(error => alert(error))
				.finally(() => this.tableLoading = false);
		}

		private copyToClipboard(password: string): void {
			navigator.clipboard.writeText(password)
				.then(() => this.successToast = true)
				.catch(err => this.errorToast = true);
		}

		private showDeleteDialog(item: Credentials): void {
			this.deletingItem = item;
			this.showingDeleteDialog = true;
		}

		private onDeleteConfirm(): void {
			const item = this.deletingItem!;
			this.deleteDialogLoading = true;
			credentialsService.delete(item)
				.then(() => {
					const index = this.items.indexOf(item);
					if (index !== -1) {
						this.items.splice(index, 1);
					}
					this.showingDeleteDialog = false;
				})
				.catch(error => alert(error))
				.finally(() => this.deleteDialogLoading = false);
		}

		private onDeleteDialogClose(): void {
			this.deletingItem = null;
		}


		@ListenTo('createItem')
		private onCreateItem(): void {
			this.showCredentialsForm();
		}

		private editItem(item: Credentials): void {
			this.showCredentialsForm(item);
		}

		private showCredentialsForm(item?: Credentials): void {
			this.editingItem = item;
			this.showingCredentialsForm = true;
		}

		private onCredentialsSave(): void {
			const item: Credentials = this.$refs.credentialsForm.serializeFormData();

			if (item.id == null) {
				this.createItem(item);
			} else {
				this.updateItem(item);
			}
		}

		private onCredentialsFormClose(): void {
			this.editingItem = null;
			this.$refs.credentialsForm.clearFormData();
		}

		private createItem(item: Credentials) {
			this.formLoading = true;
			credentialsService.save(item)
				.then(savedItem => {
					this.items.push(savedItem);
					this.closeForm();
				})
				.catch(error => alert(error))
				.finally(() => this.formLoading = false);
		}

		private updateItem(item: Credentials) {
			this.formLoading = true;
			credentialsService.update(item)
				.then(() => {
					const index = this.items.findIndex(e => e.id === item.id);
					if (index !== -1) {
						Vue.set(this.items, index, item);
					} else {
						console.warn('Item no encontrado; se añade a la lista');
						this.items.push(item);
					}
					this.closeForm();
				})
				.catch(error => alert(error))
				.finally(() => this.formLoading = false);
		}

		private closeForm() {
			this.showingCredentialsForm = false;
		}
	}
</script>

<style scoped>
	.visible-password-container {
		padding: 15px 20px;
		border-radius: 4px;
		background: white;
		color: black;
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
	}
</style>
