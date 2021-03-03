using System.Collections.Generic;
using System.Threading.Tasks;
using WebAdministration.Helpers;
using WebAdministration.Models;

namespace WebAdministration.Data
{
    public interface IUserRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<PagedList<User>> GetUsers(UserParams userParams);
    }
        
}