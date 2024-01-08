import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/user/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // USER
    {
      path: "/",
      name: "home-user",
      component: () => import("../views/user/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/user/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/user/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/user/Register.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/user/ProfileView.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/user/HistoryView.vue"),
    },
    {
      path: "/rating",
      name: "rating",
      component: () => import("../views/user/RatingView.vue"),
    },
    {
      path: "/detail-product",
      name: "detailProduct",
      component: () => import("../views/user/DetailProduct.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/user/ChatUser.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/user/OrderView.vue"),
    },
    {
      path: "/list-product",
      name: "listProduct",
      component: () => import("../views/user/ListAllProduct.vue"),
    },
    {
      path: "/kategori/:nama",
      name: "kategori",
      component: () => import("../views/user/KategoriView.vue"),
    },

    // ADMIN
    {
      path: "/admin",
      name: "dashboard-admin",
      component: () => import("../views/admin/Dashboard.vue"),
    },
    {
      path: "/admin/transaksi",
      name: "transaksi",
      component: () =>
        import("../views/admin/masterTransaksi/MasterTransaksi.vue"),
    },
    {
      path: "/admin/activity",
      name: "activity",
      // component: () =>
      //   import("../views/admin/masterTransaksi/MasterTransaksi.vue"),
    },
    {
      path: "/admin/transaksi/detail",
      name: "transaksi-detail",
      component: () =>
        import("../views/admin/masterTransaksi/MasterDetailTransaksi.vue"),
    },
    {
      path: "/detail-history",
      name: "detail-history ",
      component: () => import("../views/user/DetailHistory.vue"),
    },
    {
      path: "/admin/user",
      name: "admin-user",
      component: () => import("../views/admin/masterUser/MasterUser.vue"),
    },
    {
      path: "/admin/user/add",
      name: "admin-user-add",
      component: () => import("../views/admin/masterUser/MasterUserAdd.vue"),
    },
    {
      path: "/admin/user/:id",
      name: "admin-user-id",
      component: () => import("../views/admin/masterUser/MasterDetailUser.vue"),
    },
    {
      path: "/master/kategori",
      name: "master-kategori",
      component: () =>
        import("../views/admin/masterKategori/MasterKategori.vue"),
    },
    {
      path: "/master/tambah/kategori",
      name: "master-tambah-k",
      component: () =>
        import("../views/admin/masterKategori/MasterKategoriAdd.vue"),
    },
    {
      path: "/master/edit/kategori",
      name: "master-edit-k",
      component: () =>
        import("../views/admin/masterKategori/MasterKategoriEdit.vue"),
    },
    {
      path: "/master/tambah/produk",
      name: "master-tambah-p",
      component: () =>
        import("../views/admin/masterProduk/MasterProdukAdd.vue"),
    },
    {
      path: "/master/detail/produk",
      name: "master-detail-p",
      component: () =>
        import("../views/admin/masterProduk/MasterProdukDetail.vue"),
    },
    {
      path: "/master/edit/produk",
      name: "master-edit-p",
      component: () =>
        import("../views/admin/masterProduk/MasterProdukEdit.vue"),
    },
    {
      path: "/master/produk",
      name: "master-produk",
      component: () => import("../views/admin/masterProduk/MasterProduk.vue"),
    },
    {
      path: "/master/varian",
      name: "master-varian",
      component: () => import("../views/admin/masterVarian/MasterVarian.vue"),
    },
    {
      path: "/master/edit/varian",
      name: "master-edit-varian",
      component: () =>
        import("../views/admin/masterVarian/MasterVarianEdit.vue"),
    },
    {
      path: "/master/tambah/varian",
      name: "master-tambah-v",
      component: () =>
        import("../views/admin/masterVarian/MasterVarianAdd.vue"),
    },
    {
      path: "/master/custom/add",
      name: "master-custom-add",
      component: () => import("../views/admin/masterCustom/MasterCustom.vue"),
    },
    {
      path: "/master/detail/custom/",
      name: "master-custom-detail",
      component: () =>
        import("../views/admin/masterCustom/MasterCustomDetail.vue"),
    },
    {
      path: "/master/custom/",
      name: "master-custom",
      component: () =>
        import("../views/admin/masterCustom/MasterCustomList.vue"),
    },
    {
      path: "/master/history/",
      name: "master-history",
      component: () => import("../views/admin/masterHistory/MasterHistory.vue"),
    },
    {
      path: "/master/history/success/",
      name: "master-history-success",
      component: () =>
        import("../views/admin/masterHistory/MasterHistorySuccess.vue"),
    },
    {
      path: "/master/history/pending/",
      name: "master-history-pending",
      component: () =>
        import("../views/admin/masterHistory/MasterHistoryPending.vue"),
    },
    {
      path: "/transaction/history",
      name: "transaction-history",
      // component: () => import("path"),
    },
    {
      path: "/transaction/history/detail",
      name: "transaction/history/detail",
      // component: () => import('path')
    },
    {
      path: "/chat/admin",
      name: "chat-admin",
      component: () => import("../views/admin/chat/ChatAdmin.vue"),
    },
    {
      path: "/admin/chat",
      name: "admin/chat",
      component: () => import("../views/admin/chat/ListChatUser.vue"),
    },
    {
      path: "/chat/admin/:user_id",
      name: "chat/admin/:user_id",
      component: () => import("../views/admin/chat/ChatAdminToUser.vue"),
    },
    {
      path: "/login/sukses",
      name: "login-google",
      component: () => import("../views/user/LoginGoogle.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthUser = JSON.parse(localStorage.getItem("authUser"));
  const isAuthAdmin = JSON.parse(localStorage.getItem("authAdmin"));
  console.log(isAuthAdmin)

  console.log(to.name === "login" && isAuthAdmin);
  // console.log("from", from);
  // if (to.path === "http://localhost:8001/auth/google") next();
  // if (to.name === "home-user") next();
  if (to.name === "register") next();
  // if (to.name === "listProduct") next();
  // if (to.name === "kategori") next();
  // if (to.name === "login-google") next();
  if (isAuthAdmin) next();

  if (to.name !== "login" && !isAuthUser) next({ name: "login" });
  if (to.name === "login" && isAuthUser) next({ name: "home-user" });
  if (to.name === "login" && isAuthAdmin) next({ name: "dashboard-admin" });
  next();
});

export default router;
