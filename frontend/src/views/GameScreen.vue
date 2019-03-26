<template>
  <!-- <section class="main"> -->
  <section class="gameScreen">
    <section v-if="isPartyOn" class="partyMode">
      <div class="players">
        <party-players></party-players>
      </div>
      <div class="game">
        <router-view></router-view>
      </div>
    </section>
    <section v-else class="singleMode">
      <router-view></router-view>
    </section>
  </section>
  <!-- </section> -->
</template>

<script>
import PartyPlayers from "@/components/PartyPlayers";

export default {
  name: "Game",
  props: {
    question2: Array
  },
  created() {
    console.log("group game was created");
    var params = this.$route;
    this.params = params;    
    
  },

  computed: {
    isPartyOn() {
      if (this.params.name === "partyMode") return true;
      false;
    }
  },
  components: {
    PartyPlayers
  }
};
</script>

<style scoped lang="scss">
.partyMode {
  display: flex;
  flex-direction: row;
}

.players {
  flex-basis: 25%;
  // border-right: 1px solid black;
}

.game {
  flex-basis: 75%;
}
</style>