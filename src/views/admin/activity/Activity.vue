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
            <h2 style="font-weight: bold; font-size: 30px">Activity</h2>
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
              <h4 style="font-weight: bold">Activity</h4>
              <button
                type="button"
                class="btn btn-success"
                style="font-weight: bold"
                @click="openSchedule()"
              >
                <!-- <i class="bi bi-plus"></i> -->
                Open Schedule
              </button>
              <div>
                <select
                    v-model="company_role"
                    class="form-select"
                    aria-label="Default select example"
                    >
                    <!-- <option selected>Silahkan Pilih Role</option> -->
                    <option v-for="i in date" :value="i">
                        {{  moment(i.date).locale('id').format('ll') }}
                    </option>
                    </select>
                </div>
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
              <div style="width: 100%" class="table-responsive">
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
                        style="width: 400px; font-weight: bold; font-size: 18px"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        style="width: 400px; font-weight: bold; font-size: 18px"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        style="width: 400px; font-weight: bold; font-size: 18px"
                      >
                        status
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
                      v-for="(u, i) in schedule"
                      class="content"
                      style="height: 60px"
                    >
                      <td scope="row">{{ i + 1 }}</td>
                      <td>
                        {{ u.username }} <br> 
                        {{ moment(u.date).locale('id').format('ll') }} <br>
                        {{ u.status == 0 ? 'pending' : 'need approval' }} <br>
                        {{ !u.keterangan ? 'kosong' : u.keterangan}}
                      </td>
                      <td>{{ u }}</td>
  
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
                            @click="simpanId(u.id)"
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
                                    @click="deleteVarian"
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- modal delete end -->
                          <button
                            @click="pindahEdit(u.id)"
                            type="button"
                            class="btn btn-success"
                            style="
                              box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                            "
                          >
                            <i class="bi bi-pencil-fill"></i>
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
    import moment from "moment";
  
    moment.locale('id');

    const store = useCounterStore();
    const { id_varian } = storeToRefs(store);
    const { simpanIdVarian } = store;
  
    const router = useRouter();
  
    let date = ref([]);
    const endpoint = import.meta.env.VITE_ENDPOINT;
    let schedule = ref([])
    let valid = localStorage.getItem("token");
  
    // console.log(valid)

    const viewDate = async () => {
      try {
        let res = await axios.get(`${endpoint}/schedule`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = res.data?.data;
        date.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const viewSchedule = async () => {
      try {
        let res = await axios.get(`${endpoint}/logbook/all`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = res.data?.data;
        schedule.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const openSchedule = async () => {
        console.log(new Date().toLocaleDateString())
        let x = {
            date: new Date().toLocaleDateString(),
        };
        let res = await axios.post(`${endpoint}/schedule`, x, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        })
        console.log(res)
    }
  
    const simpanId = async (id) => {
      await simpanIdVarian(id);
    };
  
    const deleteVarian = async () => {
      try {
        // console.log(id_user.value);
        // console.log(valid.value);
        let Bearer = `Bearer ${valid}`;
        // console.log(valid, "iini delete");
        // console.log(Bearer);
        let res = await axios.delete(`${endpoint}/varian/${id_varian.value}`, {
          headers: {
            Authorization: Bearer,
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        const pesan = res.data?.status;
        // console.log(res);
        // console.log(data);
        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
  
    const pindahEdit = async (id) => {
      try {
        // console.log(id);
        await simpanIdVarian(id);
        router.push({ path: "/master/edit/varian" });
      } catch (error) {
        console.log(error);
      }
    };
  
    onMounted(() => {
      viewDate();
      viewSchedule();
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
  