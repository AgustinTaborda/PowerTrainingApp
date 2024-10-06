"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const exercises_module_1 = require("./exercises/exercises.module");
const user_routine_exercise_module_1 = require("./user_routine_exercise/user_routine_exercise.module");
const routine_module_1 = require("./routine/routine.module");
const users_module_1 = require("./users/users.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const routines_module_1 = require("./routines/routines.module");
const payments_module_1 = require("./payments/payments.module");
const notifications_module_1 = require("./notifications/notifications.module");
const messages_module_1 = require("./messages/messages.module");
const user_progress_module_1 = require("./user-progress/user-progress.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const typeormConfig_1 = require("./config/typeormConfig");
const typeorm_1 = require("@nestjs/typeorm");
const cloudfile_manager_module_1 = require("./cloudfile-manager/cloudfile-manager.module");
const jwt_1 = require("@nestjs/jwt");
const email_module_1 = require("./email/email.module");
const schedule_1 = require("@nestjs/schedule");
const crontask_exercise_module_1 = require("./crontask/crontask.exercise.module");
const excelreports_module_1 = require("./excelreports/excelreports.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeormConfig_1.default]
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            exercises_module_1.ExercisesModule,
            auth_module_1.AuthModule,
            user_routine_exercise_module_1.UserRoutineExerciseModule,
            routine_module_1.UserRoutineLogModule,
            users_module_1.UsersModule,
            subscriptions_module_1.SubscriptionsModule,
            routines_module_1.RoutinesModule,
            payments_module_1.PaymentsModule,
            notifications_module_1.NotificationsModule,
            messages_module_1.MessagesModule,
            user_progress_module_1.UserProgressModule,
            cloudfile_manager_module_1.CloudfileManagerModule,
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '200h' },
                secret: process.env.JWT_SECRET
            }),
            email_module_1.EmailModule,
            schedule_1.ScheduleModule.forRoot(),
            crontask_exercise_module_1.CronExercisesModule,
            excelreports_module_1.ExcelreportsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map