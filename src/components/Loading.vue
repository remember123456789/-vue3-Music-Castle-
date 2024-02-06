<template>
    <section>
        <div class='mock'>
            <div class='main'>
                loading...
            </div>
        </div>
    </section>
</template>    



<style lang="scss" scoped>
    section{
        width:100vw;
        height:100vh;
        position:relative;

    }
    .mock{
        
        .main{
        width:100%;
        height:100%;
        position:absolute;
            top: 0;
         z-index:100;
        // background-color:blue;
    }

    .main{
       margin:200px auto;
       text-align:center;
    }
}
</style>
