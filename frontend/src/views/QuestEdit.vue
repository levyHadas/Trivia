<template>
  <section v-if="isQuest" class="game-core main-container">
    <el-form ref="form" label-width="120px" 
      @submit.prevent="saveQuest"  :class="{'scale-down': isMenuOpen}">
      <el-form-item label="Question">
        <el-input v-model="questToEdit.txt" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="handleChooseCatogryletter">
          <el-button type="primary">
            Category
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(category, idx) in categories">
              <el-dropdown-item :key="idx" :command="category.name">{{category.name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      The Chosen Category is: {{questToEdit.category}}
      <br>
      <br>
      <el-form-item label="Options">Option 1
        <el-input v-model="questToEdit.answers[0]"></el-input>
        <br>Option 2
        <el-input v-model="questToEdit.answers[1]"></el-input>
        <br>Option 3
        <el-input v-model="questToEdit.answers[2]"></el-input>
        <br>Option 4
        <el-input v-model="questToEdit.answers[3]"></el-input>
        <br>
      </el-form-item>
      <el-form-item label="Answer">
        <el-dropdown @command="getClickedAnsLetter">
          <el-button type="primary">
            Choose The Correct Answer
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">{{questToEdit.answers[0]}}</el-dropdown-item>
            <el-dropdown-item command="1">{{questToEdit.answers[1]}}</el-dropdown-item>
            <el-dropdown-item command="2">{{questToEdit.answers[2]}}</el-dropdown-item>
            <el-dropdown-item command="3">{{questToEdit.answers[3]}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      The Correct Answer is: {{questToEdit.answers[questToEdit.correctAnswerIdx]}}
      <el-form-item label="Tags (Comma seperated)">
        <el-input v-model="tags"></el-input>
      </el-form-item>
      <el-form-item label="Hint">
        <el-input v-model="questToEdit.hint"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveQuest">Create/Save</el-button>
        <el-button type="danger" @click="removeQuest" v-if="questToEdit._id">X</el-button>
        <el-button @click="cancelEdit">Cancel</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>

export default {
  data() {
    return {
      clickedAnsLetter: "",
      questToEdit: {},
      form: {
        txt: "",
        correctAnswerIdx: null
      },
      categories: [],
      tags: ""
    };
  },

  async created() {
    var { questId } = this.$route.params;
    try {
      let question = await this.$store.dispatch({ type: "loadQuest", questId })
      this.questToEdit = JSON.parse(JSON.stringify(question));
      this.tags =
        this.questToEdit.tags.length > 0 ? this.questToEdit.tags.toString() : "";
      let categoriesFromDB = await this.$store.dispatch({type:"loadFilterOptions"})
      this.categories = categoriesFromDB.categories
    }
    catch (err) {
      console.log('Not found', err)
    }
  },

  methods: {
    async removeQuest() {
      var { questId } = this.$route.params;
      await this.$store.dispatch({ type: "removeQuest", questId });
      // TODO - let the user know if deletion succeeded or failed
      this.$router.push("/");
    },
    async saveQuest() {
      if (this.tags.length > 0) this.questToEdit.tags = this.tags.split(",");
      this.questToEdit.wasUpdatedOn = Date.now();
      if (!this.questToEdit._id) {
        this.questToEdit.createdAt = Date.now();
        this.questToEdit.tags.push(this.questToEdit.category);
        this.questToEdit.createdBy = this.currUser;
        this.$store.dispatch({
          type: "addTagsToDB",
          tags: this.questToEdit.tags
        });
      }
      await this.$store.dispatch({
        type: "saveQuest",
        quest: this.questToEdit
      });
      this.$router.push("/");
    },
    getClickedAnsLetter(command) {
      this.questToEdit.correctAnswerIdx = command;
    },
    handleChooseCatogryletter(command) {
      this.questToEdit.category = command;
    },
    cancelEdit() {
      this.$router.push("/");
    }
  },
  computed: {
    isQuest() {
      return this.questToEdit && this.questToEdit.answers ? true : false;
    },
    currUser() {
      return this.$store.getters.currUser;
    },
    realUser() {
      let user = this.$store.getters.currUser;
      if (!user._id) return false;
      if (user._id.includes("guest")) return false;
      return true;
    },
    isMenuOpen() {
      return this.$store.getters.isMenuOpen;
    }	    
  },
  watch: {}
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-textarea__inner {
  width: 80%;
}
.el-input {
  width: 400px;
  margin: 5px;
}
.edit-row {
  display: flex;
  align-items: flex-start;
}
.edit-row p {
  width: 150px;
}
.stock {
  margin: 10px 120px;
}
.save {
  margin: 30px 150px;
  width: 300px;
}
.el-radio {
  margin-right: 10px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
