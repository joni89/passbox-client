<template>
	<v-dialog
			:value="showing"
			width="500"
			persistent
	>
		<v-card>
			<v-card-title>
				{{ title }}
			</v-card-title>
			<v-card-text>
				<div style="position: relative">
					<slot></slot>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer/>
				<v-btn color="grey darken-2" outlined @click="onCancel">{{cancelButtonText}}</v-btn>
				<v-btn color="primary" @click="onSave">{{saveButtonText}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

	@Component({
		components: {}
	})
	export default class FormDialog extends Vue {

		@Prop({
			type: Boolean,
			default: false
		})
		private showing!: boolean;

		@Prop({
			type: String,
			required: true
		})
		private title!: boolean;

		@Prop({
			type: String,
			default: 'Cancelar'
		})
		private cancelButtonText!: string;

		@Prop({
			type: String,
			default: 'Guardar'
		})
		private saveButtonText!: string;

		@Watch('showing')
		private onShowingChange(showing: boolean): void {
			this.$emit(showing ? 'open' : 'close');
		}

		private onCancel(): void {
			this.$emit('update:showing', false);
		}

		private onSave(): void {
			this.$emit('save');
		}

	}
</script>
