<template>
  <span :id="el_id" style="display: inline-block"></span>
</template>

<script>
  import $ from 'jquery';
  import '@/plugins/selector/js/jquery.addressSelect';

  export default {
    name: 'EnAddressSelect',
    props: {
      api: {
        type: String,
        default: process.env.BASE_API
      },
      default: {
        type: Array
      },
      names: {
        type: Object
      },
      changed: {
        type: Function
      }
    },
    data() {
      return {
        el_id: 'AS-' + this._uid
      };
    },
    mounted() {
      const options = {};
      if (this.api) options.appApi = this.api;
      if (this.default) options.deData = this.default;
      if (this.names) options.names = this.names;
      if (this.quick !== undefined) options.quick = this.quick;
      if (this.setInput !== undefined) options.setInput = this.setInput;
      if (this.changed) options.callback = this.changed;
      this.$nextTick(() => {
        $('#' + this.el_id).addressSelect(options);
      });
    }
  };
</script>
