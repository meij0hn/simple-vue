<template>
  <div class="hero">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Simple Application, </strong><br />
                for a new Generation
              </h2>
              <p>Ayo segera pilih menu yang ada</p>
              <b-icon-arrow-up /> Diatas
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/Gambar2.png" width="100%" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <img src="../assets/images/Gambar2.png" width="100%" />
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Simple Application, </strong><br />
                for a new Generation
              </h2>
              <p>Ayo segera pilih dan pesan makanan favorit Anda</p>
              <b-icon-arrow-up /> Diatas
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style>
</style>