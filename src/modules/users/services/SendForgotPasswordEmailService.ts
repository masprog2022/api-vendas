import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from "path";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    // console.log(user);

    //const token = await usersTokenRepository.generate(user.id);
    const { token } = await usersTokenRepository.generate(user.id);

    // console.log(token);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API Vendas] Recuperação de Senha",
      templateData: {
        //template: `Olá {{name}}: {{token}}`,
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
