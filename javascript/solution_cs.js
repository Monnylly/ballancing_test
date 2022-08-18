function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {

  const customer_suc_away = customerSuccessAway;
  const customer_suc = customerSuccess;
  const clients = new Set(customers);

  const result_cs = customer_suc
    .filter(({ id }) => !customer_suc_away.includes(id))
    .sort((a, b) => a.score - b.score)
    .map((index) => {
      let count_costumer = 0;
      clients.forEach((customer) => {
        if (customer.score <= index.score) {
          clients.delete(customer);
          count_costumer++;
        }
      });
      return {
        ...index,
        count_costumer,
      };
    })
    .sort((a, b) => b.count_costumer - a.count_costumer);

  const first_position = result_cs[0];
  const second_position = result_cs[1];

  return first_position.count_costumer === second_position.count_costumer ? 0 : first_position.id;
};