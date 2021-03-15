<template>
  <div id="nav" class="flex-container">
    <div class="user" ref="user">
      <div v-if="token" class="myinfo" @click="register">
        <div>{{ name }}</div>
        <div v-if="showUserDrop" class="user-drop">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>我喜爱的</span>
            </div>
            <div v-for="(value, type) in likes" :key="type" class="favorite">
              <router-link
                :to="`/likes/${type}`"
                class="list-link"
                @click.native="toggleDrop"
                >{{ type | fType }}</router-link
              >
            </div>
            <el-button type="primary" @click="logout">退出</el-button>
          </el-card>
        </div>
      </div>
      <div v-else class="registry" @click="register">
        <div>注册 / 登录</div>
        <div v-if="showUserDrop" class="user-drop">
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            class="loginForm"
            label-width="100px"
            width="300px"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >注册</el-button
              >
              <el-button @click="login('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <ul>
      <li
        v-for="button in buttons"
        :key="button.name"
        :class="{ 'nav-dropdown-container': button['sub'] }"
      >
        <router-link
          :to="button.url"
          :class="['nav-link', { active: isActive(button) }]"
          >{{ button.name }}</router-link
        >
        <span v-if="button['sub']" class="arrow"></span>
        <ul v-if="button['sub']" class="nav-dropdown">
          <li v-for="sub in button.sub" :key="sub.url">
            <router-link :to="sub.url" class="nav-link">{{
              sub.name
            }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <form
      action="/search"
      autocomplete="off"
      :class="['search-box', { clicked: visible }]"
      @submit.prevent="submit"
    >
      <div :class="['search-container', { clicked: visible }, { droped }]">
        <div :class="['logo-container', { visible }]">
          <div class="pre-logo"><SearchLogo class="logo" /></div>
        </div>
        <div class="input-wrapper">
          <input
            name="keyword"
            class="search-input"
            @click="visible = true"
            @input="doSuggest"
            v-model="text"
            ref="input"
          />
        </div>
        <button type="submit" id="search-btn">
          <div class="search-logo"><SearchLogo class="logo" /></div>
        </button>
      </div>
      <div :class="['search-dropdown', { visible: droped }]" ref="suggest">
        <div class="split"></div>
        <div class="drop selected">
          <ul class="selected-list">
            <div v-if="selected.length > 0">
              <li class="brief">
                <span>已选</span>
                <div class="clear" @click="clear">
                  <TrashLogo />
                </div>
              </li>
              <div class="split"></div>
            </div>
            <li
              v-for="item in selected"
              :key="item.type + item.id"
              @click.stop="removeSelected(item)"
            >
              <div class="type">
                <strong>{{ item.type | fType }}</strong>
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="id">{{ item.id }}</div>
            </li>
          </ul>
        </div>
        <div class="drop suggest">
          <ul class="suggest-list">
            <div v-if="suggest.length > 0">
              <li class="brief">推荐</li>
              <div class="split"></div>
            </div>
            <li
              v-for="item in suggest"
              :key="item.type + item.id"
              @click.stop="selectSuggestion(item)"
            >
              <div class="type">
                <strong>{{ item.type | fType }}</strong>
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="id">{{ item.id }}</div>
            </li>
          </ul>
        </div>
        <div v-if="showHistory" class="drop history">
          <ul>
            <div v-if="history.length > 0">
              <li class="brief">
                <span>历史</span>
                <div class="clear" @click="clearHistory">
                  <TrashLogo />
                </div>
              </li>
              <div class="split"></div>
            </div>
            <li
              v-for="(historyItem, index) in history"
              :key="index"
              @click.stop="selectHistory(historyItem)"
            >
              <ul class="history-list">
                <li v-for="item in historyItem" :key="item.type + item.id">
                  <div class="type">
                    <strong>{{ item.type | fType }}</strong>
                  </div>
                  <div class="name">{{ item.name }}</div>
                  <div class="id">{{ item.id }}</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SearchLogo from "@/assets/search.svg";
import ElasticSearch from "@/services/ElasticSearch";
import TrashLogo from "@/assets/trash.svg";
import { mapActions, mapMutations, mapState } from "vuex";
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      visible: false,
      selected: [],
      suggest: [],
      text: "",
      isRefresh: false,
      changeHistory: false,
      showUserDrop: false,
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "用户名", trigger: "blur" }],
        password: [{ required: true, message: "密码", trigger: "blur" }]
      }
    };
  },
  components: {
    SearchLogo,
    TrashLogo
  },
  props: {
    buttons: Array
  },
  computed: {
    droped() {
      return (
        this.visible &&
        (this.selected.length > 0 ||
          this.suggest.length > 0 ||
          this.history.length > 0)
      );
    },
    showHistory() {
      return (
        this.visible && this.selected.length == 0 && this.suggest.length == 0
      );
    },
    ...mapState(["history", "token", "name", "likes"])
  },
  methods: {
    ...mapMutations(["clearHistory", "saveHistory", "updateToken", "logout"]),
    ...mapActions(["initState"]),
    isActive(button) {
      if (this.$route.path === button.url) {
        return true;
      }
      if (button["sub"]) {
        for (let sub of button.sub) {
          if (this.$route.path === sub.url) {
            return true;
          }
        }
      }
      return false;
    },
    selectInput() {
      this.visible = true;
    },
    onClickOutside(event) {
      const { input, suggest, user } = this.$refs;
      if (!input.contains(event.target) && !suggest.contains(event.target)) {
        this.visible = false;
      }
      if (!user.contains(event.target)) {
        this.showUserDrop = false;
      }
    },
    doSuggest() {
      if (this.isRefresh) {
        return;
      }
      if (this.text == "") {
        this.suggest.splice(0);
        return;
      }

      this.isRefresh = true;
      ElasticSearch.suggest(this.text).then(res => {
        let new_suggest = res.data.hits.hits.map(data => {
          return {
            name: data._source.name,
            type: data._id.split("#")[0],
            id: data._source.id
          };
        });
        this.suggest.splice(0);
        this.suggest.push(...new_suggest);
        this.suggest.push({ type: "dvd_id", name: this.text, id: this.text });
        this.suggest.push({ type: "title", name: this.text, id: this.text });
      });

      this.isRefresh = false;
    },
    selectSuggestion(item) {
      this.selected.push(item);
      this.suggest.splice(0);
      this.text = "";
      this.changeHistory = true;
    },
    removeSelected(item) {
      this.selected.splice(this.selected.indexOf(item), 1);
      this.changeHistory = true;
    },
    submit() {
      let query;
      if (this.text.length > 0) {
        query = { keyword: this.text };
        if (this.history.length == 0 || this.text != this.history[0][0].name) {
          this.changeHistory = true;
        }
      } else if (this.selected.length > 0) {
        query = this.selected.reduce((acc, ele) => {
          if (!acc[ele.type]) {
            acc[ele.type] = ele.id;
          } else {
            if (Array.isArray(acc[ele.type])) {
              acc[ele.type].push(ele.id);
            } else {
              acc[ele.type] = [acc[ele.type], ele.id];
            }
          }
          return acc;
        }, {});
      }

      if (this.changeHistory) {
        this.saveSearchHistory();
        this.changeHistory = false;
      }

      if (query) {
        this.$router.push({ path: "/search", query }).catch(error => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      }
    },
    clear() {
      this.selected.splice(0);
    },
    selectHistory(currentHistory) {
      this.history.splice(this.history.indexOf(currentHistory), 1);
      this.history.unshift(currentHistory);
      this.selected.push(...currentHistory);
      if (this.selected[0].type == "keyword") {
        this.text = this.selected[0].name;
        this.selected.pop();
      }
    },
    saveSearchHistory() {
      if (this.selected.length == 0) {
        this.history.unshift([
          {
            type: "keyword",
            name: this.text,
            id: this.text
          }
        ]);
      } else {
        this.history.unshift([...this.selected]);
      }
      this.history.splice(6);
    },
    register() {
      this.showUserDrop = true;
    },
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          UserDataService.register(this.loginForm)
            .then(() => {
              this.$message({ message: "注册成功", type: "success" });
              this.showUserDrop = false;
            })
            .catch(err => this.$message.error(err.response.data.msg));
        }
      });
    },
    login(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          UserDataService.login(this.loginForm)
            .then(response => {
              if (response.status == 200) {
                this.$message({ message: "登录成功", type: "success" });
                this.showUserDrop = false;
                this.updateToken(response.data.token);
                this.initState(response.data);
              } else {
                this.$message.error(response.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err.response.data.msg);
            });
        }
      });
    },
    toggleDrop() {
      this.showUserDrop = !this.showUserDrop;
    }
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  },
  watch: {
    history() {
      this.saveHistory();
    }
  }
};
</script>

<style scoped src="./Nav.css"></style>
