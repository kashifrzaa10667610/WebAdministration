using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using Microsoft.Extensions.Hosting;
using WebAdministration.Data;
using WebAdministration.Helpers;
using AutoMapper;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Identity;
using WebAdministration.Models;
using Microsoft.AspNetCore.Authorization;


namespace WebAdministration
{
    public class Startup
    {
    

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => {

                x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => {
               
                x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            ConfigureServices(services);
        }
        public void ConfigureServices(IServiceCollection services)
        {
            IdentityBuilder builder = services.AddIdentityCore<User>(opt =>
            {    
                opt.Password.RequireDigit = false;
                opt.Password.RequiredLength = 4;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
                opt.Lockout.MaxFailedAccessAttempts = 5;
                opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
            });

            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            builder.AddEntityFrameworkStores<DataContext>();
            builder.AddRoleValidator<RoleValidator<Role>>();
            builder.AddRoleManager<RoleManager<Role>>();
            builder.AddSignInManager<SignInManager<User>>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew=TimeSpan.Zero
                    };
                });

            services.AddAuthorization(options =>
            {
                //Policy For Andmin and HelpDesk
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                options.AddPolicy("RequireHelpDeskRole",policy=>policy.RequireRole("HelpDesk"));
                options.AddPolicy("Require-Admin-HelpDesk-Role", policy => policy.RequireRole("Admin", "HelpDesk"));
                options.AddPolicy("Require-Admin-Member-Role",policy=>policy.RequireRole("Admin","Member"));
                options.AddPolicy("Require-Member-Admin-HelpDesk-Role",policy=>policy.RequireRole("Member","Admin", "HelpDesk"));


                // Policy for Members
                options.AddPolicy("MemberOnly", policy => policy.RequireRole("Member"));
                options.AddPolicy("Member-VIP", policy=>policy.RequireRole( "Member","VIP"));
                options.AddPolicy("Member-Account-VIP",policy=>policy.RequireRole("Member","Account","VIP"));
                options.AddPolicy("Member-Account",policy=>policy.RequireRole("Member","Account"));

                //ClaimPolicy for users
                 options.AddPolicy("CurrentlyLoggedInUserOnly", policy => policy.RequireClaim("Id"));

            });

            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddJsonOptions(o =>
                {
                    o.JsonSerializerOptions.PropertyNamingPolicy = null;
                    o.JsonSerializerOptions.DictionaryKeyPolicy = null;
                })
                .AddNewtonsoftJson(x=>x.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Serialize);
               ;
        
            services.AddCors();
            services.AddAutoMapper(typeof(UserRepository).Assembly);
            services.AddTransient<Seed>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<LogUserActivity>();


        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }

            //seeder.SeedUsers();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
