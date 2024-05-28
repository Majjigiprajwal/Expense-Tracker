import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  categoryData: {},
  expenseData: {},
  incomeData: {},
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSegregatedData: (state, action) => {
      state.categoryData = action.payload[0];
      state.expenseData = action.payload[1];
      state.incomeData = action.payload[2];
    },

    updateGraphData: (state, action) => {
      const { type , transaction } = action.payload;
      const month = moment(transaction.date).format('MMMM');

      switch (type) {
        case 'add':
          if (transaction.transactionType === 'expense') {
            state.categoryData[transaction.category] = (state.categoryData[transaction.category] || 0) + transaction.amount;
            state.expenseData[month] = (state.expenseData[month] || 0) + transaction.amount;
          } else if (transaction.type === 'income') {
            state.incomeData[month] = (state.incomeData[month] || 0) + transaction.amount;
          }
          break;

        case 'delete':
          if (transaction.transactionType === 'expense') {
            state.categoryData[transaction.category] -= transaction.amount;
            state.expenseData[month] -= transaction.amount;
          } 
          else if (transaction.type === 'income') {
            state.incomeData[month] -= transaction.amount;
          }
          break;

        case 'update':
            const {previousTransaction} = action.payload
          if (previousTransaction) {
            const prevMonth = moment(previousTransaction.date).format('MMMM');
            if (previousTransaction.transactionType === 'expense') {
              state.categoryData[previousTransaction.category] -= previousTransaction.amount;
              state.expenseData[prevMonth] -= previousTransaction.amount;
            } 
            else if (previousTransaction.transactionType === 'income') {
              state.incomeData[prevMonth] -= previousTransaction.amount;
            }
          }
          if (transaction.transactionType === 'expense') {
            state.categoryData[transaction.category] = (state.categoryData[transaction.category] || 0) + transaction.amount;
            state.expenseData[month] = (state.expenseData[month] || 0) + transaction.amount;
          } else if (transaction.transactionType === 'income') {
            state.incomeData[month] = (state.incomeData[month] || 0) + transaction.amount;
          }
          break;

        default:
          break;
      }
    }
  },
});

export const { setSegregatedData, updateGraphData } = categorySlice.actions;

export default categorySlice.reducer;

