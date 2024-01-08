<template>
  <div
    style="
      width: 100%;
      height: 80px;
      background-color: #024d75;
      box-shadow: 0rem 0.3rem 0.3rem rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: row-reverse;
      padding-right: 20px;
      position: fixed;
      z-index: 1;
    "
    class="header"
  >
    <div style="display: flex; align-items: center" class="btn-group">
      <i
        style="font-size: 30px; color: aliceblue;"
        class="bi bi-person-circle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></i>

      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><a class="dropdown-item" @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { routerKey, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();

const logout = async () => {
  localStorage.clear();
  toast.success("Logout Berhasil!!", { autoClose: 2000 });
  setTimeout(() => {
    router.push({ path: "/login" });
  }, 1500);
};
</script>
<style scoped>
.dropdown-menu li a {
  font-weight: bold;
  transition: all 0.3s ease-in;
}
.dropdown-menu li a:hover {
  font-weight: bold;
  border-radius: 5px;
  color: #fff;
  background-color: chocolate;
}
</style>
