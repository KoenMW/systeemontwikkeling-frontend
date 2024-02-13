<template>

    <section>
        <QrcodeStream @detect="onDetect"></QrcodeStream>
    </section>

</template>


<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    props: {

    },
    components: {
        QrcodeStream
    },
    methods: {
         onDetect (detectedCodes) {
            console.log('codes: ', detectedCodes);
         }
    }
}

</script>