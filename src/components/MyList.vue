<template>
  <div class="my-list">
    <el-dialog
      :title="'导入' + $options.filters.fType(type)"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-input
        type="textarea"
        :rows="18"
        placeholder="请输入内容"
        v-model="importText"
        resize="none"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doImport">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="导入中"
      :visible.sync="progressVisible"
      width="30%"
      center
    >
      <p><strong>总数:</strong> {{ progress.total }}</p>
      <p><strong>成功:</strong> {{ progress.success }}</p>
      <p><strong>失败:</strong> {{ progress.failed }}</p>
      <p><strong>疑似:</strong> {{ progress.mal }}</p>
      <p><strong>重复:</strong> {{ progress.dup }}</p>
      <el-row>
        <el-col :span="12">
          <p><strong>失败</strong></p>
          <el-input
            :disabled="isImporting"
            type="textarea"
            v-model="failedText"
            :rows="10"
            resize="none"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <p><strong>疑似</strong></p>
          <el-input
            :disabled="isImporting"
            type="textarea"
            v-model="malText"
            :rows="10"
            resize="none"
          ></el-input>
        </el-col>
      </el-row>
    </el-dialog>
    <ItemGallery :items="items" @scrollReachBottom="loadData">
      <el-button
        type="primary"
        :icon="icon"
        circle
        @click="showDialog"
      ></el-button>
    </ItemGallery>
  </div>
</template>

<script>
import ItemGallery from "@/components/ItemGallery.vue";
import JavDataService from "@/services/JavDataService";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    cids: Array,
    message: String,
    type: String
  },
  data() {
    return {
      index: 0,
      limit: 50,
      items: [],
      isLoading: false,
      isImporting: false,
      importText: "",
      dialogVisible: false,
      progressVisible: false,
      progress: {
        total: 0,
        success: 0,
        failed: 0,
        mal: 0,
        dup: 0
      },
      malIds: [],
      failedIds: []
    };
  },
  components: {
    ItemGallery
  },
  computed: {
    ...mapGetters(["getRec"]),
    param() {
      return { cids: this.cids.slice(this.index, this.limit + this.index) };
    },
    icon() {
      return this.isImporting ? "el-icon-loading" : "el-icon-document-add";
    },
    failedText() {
      return this.failedIds.join("\n");
    },
    malText() {
      return this.malIds.join("\n");
    }
  },
  metaInfo() {
    return {
      title: this.message
    };
  },
  methods: {
    ...mapActions(["importRec"]),
    showDialog() {
      if (this.isImporting) {
        this.progressVisible = !this.progressVisible;
        return;
      }
      this.dialogVisible = true;
    },
    async doImport() {
      this.dialogVisible = false;
      if (this.isImporting) {
        return;
      }
      this.isImporting = true;
      this.clearProgress();

      const lines = this.importText.split(/\n\s*/);
      for (const line of lines) {
        const dvdAndComment = line.split(/\s+/);
        const dvd_id = dvdAndComment[0];
        const comment = dvdAndComment.slice(1).join(" ");
        this.$set(this.progress, "total", this.progress.total + 1);
        await JavDataService.getCid(dvd_id)
          .then(response => {
            if (response.data && response.data.length > 0) {
              if (response.data.length == 1) {
                const cid = response.data[0].cid;
                console.log(dvd_id, "->", cid);
                if (this.getRec({ cid, type: this.type })) {
                  this.$set(this.progress, "dup", this.progress.dup + 1);
                  return;
                }

                const data = { cid };
                if (comment) {
                  data.comment = comment;
                }
                this.importRec({
                  type: this.type,
                  data
                });
                this.$set(this.progress, "success", this.progress.success + 1);
              } else {
                this.$set(this.progress, "mal", this.progress.mal + 1);
                this.malIds.push(dvd_id);
                return;
              }
            } else {
              throw new Error("not found dvd_id");
            }
          })
          .catch(err => {
            this.$set(this.progress, "failed", this.progress.failed + 1);
            this.failedIds.push(dvd_id);
            console.log(dvd_id, err.message);
          });
      }
      this.isImporting = false;
      this.progressVisible = true;
    },
    loadData() {
      if (this.index < this.cids.length && !this.isLoading) {
        this.isLoading = true;
        JavDataService.getByCids(this.param)
          .then(response => {
            this.items.push(...response.data);
            this.index += this.limit;
            this.isLoading = false;
          })
          .catch(() => {
            console.log("get page failed:", this.$route.fullPath);
            this.$router.replace("/404");
          });
      }
    },
    clearProgress() {
      this.progress = Object.assign(
        {},
        {
          total: 0,
          success: 0,
          failed: 0,
          mal: 0,
          dup: 0
        }
      );
      this.failedIds.splice(0);
      this.malIds.splice(0);
    }
  },
  created() {
    this.loadData();
  }
};
</script>
