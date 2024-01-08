<template>
  <div class="wrapper" style="display: flex; width: 100%; height: 100%">
    <!-- left -->
    <SidebarAdmin></SidebarAdmin>
    <!-- right -->
    <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      "
      class="right"
    >
      <div class="header">
        <HeaderAdmin></HeaderAdmin>
      </div>

      <!-- content -->
      <div
        style="
          width: 100%;
          min-height: 100vh;
          height: 100%;
          display: flex;
          margin-top: 10vh;
          flex-direction: column;
          align-items: center;
          padding-left: 300px;
          padding-bottom: 1%;
          gap: 20px;
        "
        class="container-content"
      >
        <!-- header -->
        <div
          style="
            width: 100%;
            min-height: 9vh;
            height: 20%;
            display: flex;
            align-items: center;
            padding-left: 20px;
          "
          class="content-header"
        >
          <h2 style="font-weight: bold; font-size: 30px">Master User</h2>
        </div>
        <!-- header end -->
        <!-- table -->
        <div
          style="
            width: 90%;
            min-height: 35vh;
            height: 100%;
            background-color: #d0d4ca;
            display: flex;
            flex-direction: column;
            padding-top: 1%;
            align-items: center;
            gap: 2px;
            border-radius: 10px;
            box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
          "
          class="container-table"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 98%;
              height: 50px;
              padding-left: 20px;
              padding-right: 20px;
              border-top-right-radius: 10px;
              border-top-left-radius: 10px;
              background-color: #f8f9fa;
              box-shadow: 0rem 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
            "
            class="table-header"
          >
            <h4 style="font-weight: bold">Detail Data User</h4>
          </div>
          <div
            style="
              width: 98%;
              height: 96%;
              background-color: #f8f9fa;
              display: flex;
              padding-left: 15px;
              justify-content: center;
              border-bottom-right-radius: 10px;
              border-bottom-left-radius: 10px;
            "
            class="outer-table"
          >
            <!-- detail user -->
            <table class="table table-borderless table-hover table-light">
              <tbody v-for="user in users">
                <tr>
                  <td width="200px">Nama Lengkap</td>
                  <td width="20px">:</td>
                  <td>{{ user.full_name }}</td>
                </tr>
                <tr>
                  <td width="200px">Email</td>
                  <td width="20px">:</td>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <td width="200px">Sekolah</td>
                  <td width="20px">:</td>
                  <td>{{ user.school }}</td>
                </tr>
                <tr>
                  <td width="200px">Alamat</td>
                  <td width="20px">:</td>
                  <td>{{ user.adress }}</td>
                </tr>
                <tr>
                  <td width="200px">Role</td>
                  <td width="20px">:</td>
                  <td>{{ user.company_role }}</td>
                </tr>
                <tr>
                  <td width="200px">Kantor</td>
                  <td width="20px">:</td>
                  <td>{{ user.company }}</td>
                </tr>
              </tbody>
            </table>
            <!-- detail user -->
            <!-- inner table -->
          </div>
        </div>
      </div>
      <!-- content end -->
    </div>
  </div>
</template>

<script setup>
  import SidebarAdmin from "../../../components/SidebarAdmin.vue";
  import HeaderAdmin from "../../../components/HeaderAdmin.vue";
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";

  const store = useCounterStore();
  const { id_client } = storeToRefs(store);
  const { simpanIdUsers, simpanIdProduk } = store;

  const router = useRouter();

  let users = ref([]);
  let valid = localStorage.getItem("token");
  let id = id_client.value;

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewUser = async () => {
    try {
      //   console.log(id);
      let res = await axios.get(`${endpoint}/user/getDataUserById/${id}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      users.value.push(data);

      //   console.log(users.value);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewUser();
  });
</script>

<style scoped>
  td {
    font-size: 18px;
    font-weight: bold;
  }
</style>
