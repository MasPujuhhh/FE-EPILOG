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
          <h2 style="font-weight: bold; font-size: 30px">Master Custom</h2>
        </div>
        <!-- header end -->
        <!-- table -->
        <div
          style="
            width: 90%;
            min-height: 85vh;
            height: 100%;
            background-color: #d0d4ca;
            display: flex;
            flex-direction: column;
            padding-top: 1%;
            align-items: center;
            gap: 10px;
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
              height: 10%;
              padding-left: 20px;
              padding-right: 20px;
            "
            class="table-header"
          >
            <h4 style="font-weight: bold">Data Custom</h4>
            <button
              type="button"
              class="btn btn-success"
              style="font-weight: bold"
              @click="$router.push('/master/custom/add')"
            >
              <i class="bi bi-plus"></i>
              Add Produk
            </button>
          </div>
          <div
            style="
              width: 98%;
              height: 96%;
              display: flex;
              justify-content: center;
            "
            class="outer-table"
          >
            <div class="table-responsive">
              <!-- inner table -->
              <table class="table table-bordered table-hover align-middle">
                <thead
                  style="height: 60px; padding: 0; text-align: center"
                  class="table table-light align-middle"
                >
                  <tr>
                    <th
                      scope="col"
                      style="width: 60px; font-weight: bold; font-size: 18px"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      style="width: 600px; font-weight: bold; font-size: 18px"
                    >
                      Photo
                    </th>
                    <th
                      scope="col"
                      style="width: 400px; font-weight: bold; font-size: 18px"
                    >
                      Nama Produk
                    </th>
                    <th
                      scope="col"
                      style="width: 200px; font-weight: bold; font-size: 18px"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      style="width: 400px; font-weight: bold; font-size: 18px"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  style="height: 60px; padding: 0; text-align: center"
                  class="table align-middle"
                >
                  <tr
                    v-for="(u, i) in produk"
                    class="content"
                    style="height: 60px"
                  >
                    <td scope="row">{{ i + 1 }}</td>
                    <td>
                      <img
                        style="width: 200px"
                        :src="
                          'http://localhost:8001/assets/img/' + u.gambar_produk
                        "
                        alt="my image"
                      />
                    </td>
                    <td>{{ u.nama_produk }}</td>
                    <td>{{ u.harga_produk }}</td>
                    <td>
                      <!-- action -->
                      <div
                        style="
                          display: flex;
                          gap: 10px;
                          justify-content: center;
                        "
                        class="action"
                      >
                        <button
                          @click="simpanId(u.custom_id)"
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDelete"
                          style="
                            box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                          "
                        >
                          <i class="bi bi-trash3-fill"></i>
                        </button>
                        <!-- modal delete -->
                        <div
                          class="modal fade"
                          id="modalDelete"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1
                                  style="font-weight: bold"
                                  class="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Confirm Required
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div style="font-weight: bold" class="modal-body">
                                Are you sure delete this item?
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  @click="deleteProduk"
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- modal delete end -->

                        <button
                          @click="pindahDetail(u.id)"
                          type="button"
                          class="btn btn-secondary"
                          style="
                            box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                          "
                        >
                          <i class="bi bi-search"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  const store = useCounterStore();
  const { tokenAdmin, id_user, id_produk } = storeToRefs(store);
  const { simpanIdUsers, simpanIdProduk } = store;

  const router = useRouter();

  let produk = ref([]);
  let valid = localStorage.getItem("token");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewProduct = async () => {
    try {
      let res = await axios.get(`${endpoint}/custom`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      // console.log(produk);
      //   console.log(data);
      for (let i = 0; i < data.length; i++) {
        produk.value.push(data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const simpanId = async (id) => {
    await simpanIdProduk(id);
    // console.log(id_produk.value);
  };

  const deleteProduk = async () => {
    try {
      // console.log(id_user.value);
      // console.log(valid.value);
      let Bearer = `Bearer ${valid}`;
      // console.log(valid, "iini delete");
      // console.log(Bearer);
      let res = await axios.delete(`${endpoint}/custom/${id_produk.value}`, {
        headers: {
          Authorization: Bearer,
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      const pesan = res.data?.status;
      // console.log(res);
      toast.success(pesan, { autoClose: 2000 });
      setTimeout(() => {
        location.reload();
      }, 1500);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const pindahDetail = async (id) => {
    try {
      // console.log(id);
      await simpanIdProduk(id);
      router.push({ path: "/master/detail/custom" });
    } catch (error) {
      console.log(error);
    }
  };

  // watch(token, (newValue, oldValue) => {
  //   console.log(newValue);
  //   valid.value = token.value;
  // });
  onMounted(() => {
    viewProduct();
  });
</script>

<style scoped>
  .content td {
    font-size: 16px;
    font-weight: bold;
  }

  .content tr:hover {
    background-color: aquamarine !important;
  }
</style>
