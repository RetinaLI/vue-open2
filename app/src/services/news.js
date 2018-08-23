import axiosApi from '@/http/axiosApi';

class NewsService {
  async getNews (page = {}) {
    return axiosApi('getNews', page);
  }
}

let newsServer = new NewsService();

export default newsServer;
