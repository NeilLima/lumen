/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CoreModule } from './core/core.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';
import { AccountsModule } from './modules/accounts/accounts.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { TransactionsModule } from './modules/transactions/transactions.module.js';
import { EstoqueModule } from './modules/estoque/estoque.module.js';
import { IncomesModule } from './modules/incomes/incomes.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module.js';
import { CardsModule } from './modules/cards/cards.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    CoreModule,
    AuthModule,
    DashboardModule,
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    EstoqueModule,
    IncomesModule,
    ProductsModule,
    SubscriptionsModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

