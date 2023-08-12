import moment from 'moment';

// Function to format date
export const formatDate = (dateString, format) => {
  return moment(dateString).format(format);
};