export default function formatRupiah(angka) {
  let formatNumber = new Intl.NumberFormat("id-ID").format(angka);

  return "Rp. " + formatNumber;
}
