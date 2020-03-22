<template>
	<v-list dense>
		<v-list-item link v-for="label in labels" :key="label.id">
			<v-list-item-action>
				<v-icon>mdi-label-outline</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title>
					{{ label.text }}
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<v-list-item>
			<v-list-item-action>
				<v-icon>mdi-plus</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title>Crear etiqueta</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import Label from '@/model/Label';

	@Component({})
	export default class Menu extends Vue {

		private labels: Label[] = [
			{id: 1, text: 'Catequistas'},
			{id: 2, text: 'Confirmación'},
			{id: 3, text: 'Conocidos en uso'},
			{id: 4, text: 'Curas'},
			{id: 5, text: 'Family'},
			{id: 6, text: 'Friends'},
			{id: 7, text: 'Parroquia'},
			{id: 8, text: 'Pos-confirmación'},
		];

	}
</script>
