$(document).ready(function () {
  const API_BASE = 'http://localhost:5000';

  $('#orderForm').on('submit', async function (e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append('name', $('#name').val().trim());
    formData.append('phone', $('#phone').val().trim());
    formData.append('type', $('#type').val());
    formData.append('deadline', $('#deadline').val());

    const file = $('#design')[0].files[0];
    if (file) {
      formData.append('design', file);
    }

    if (!formData.get('name') || !formData.get('phone') || !formData.get('type') || !formData.get('deadline')) {
      $('#orderResponse').text('Please fill all required fields.');
      return;
    }

    const btn = $('#submitOrder');
    btn.prop('disabled', true).text('Sending...');

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        $('#orderResponse').text(data.error || 'Error while saving order');
        return;
      }

      alert("Your order has been submitted! ✅");
      $('#orderResponse').text('Saved in DB.');
      $('#orderForm')[0].reset();

    } catch (err) {
      console.error(err);
      $('#orderResponse').text('Server error.');
    } finally {
      btn.prop('disabled', false).text('Submit Order');
    }
  });
});
