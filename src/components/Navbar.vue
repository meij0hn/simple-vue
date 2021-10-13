<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="/">MJOHN</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <b-nav-item-dropdown text="Menu" right>

              <router-link to="/logout-e3" class="dropdown-item">Logout E3</router-link>
              <router-link to="/cek-payment-order" class="dropdown-item">Release Unit from Midtrans</router-link>
              <router-link to="/vat" class="dropdown-item">VAT</router-link>
              <router-link to="/bookinginfo" class="dropdown-item">Booking Info</router-link>
              <router-link to="/cancel" class="dropdown-item">Rollback Cancel Unit</router-link>
              <router-link to="/paymentremarks" class="dropdown-item">Change Payment Remarks</router-link>
            
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="#">
                Meijohn
                <b-icon-person></b-icon-person>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Navbar",
};
</script>

<style></style>
