<script setup lang="ts">
  import { Centrifuge } from 'centrifuge';
  import useBehavior from './useBehavior';
  import { ref } from 'vue';
  import useWS from '@/services/ws/useWS'
  import { EventEnum } from '@/infrastructure/ws/centrifuge/EventEnum';

  const {

  } = useBehavior()

  const messages = ref([])

  const addMessage = (message: object): void => {
    console.log('addMessage: ', message)
    messages.value.push(message)
  }

  const ws = useWS()

  const testChannelChannel = ws.makeSubscription('test-channel-2');
  testChannelChannel.on(EventEnum.PUBLISH, addMessage)
  testChannelChannel.on(EventEnum.PUBLICATION, addMessage)
  testChannelChannel.subscribe()

  const nmsUserBoundaryChannel = ws.makeSubscription('chat:manager#a81478a8-08fa-4fab-b502-b28a69d17149');
  nmsUserBoundaryChannel.on(EventEnum.PUBLISH, addMessage)
  nmsUserBoundaryChannel.on(EventEnum.PUBLICATION, addMessage)
  nmsUserBoundaryChannel.subscribe()
</script>

<template>
  <div>
    <h2>Centrifuge</h2>
    <pre>{{ messages }}</pre>
  </div>
</template>