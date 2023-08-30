<script>
	import configs from '../../store';
</script>

<div>{@html JSON.stringify($configs).replaceAll(',', '<br>')}</div>
