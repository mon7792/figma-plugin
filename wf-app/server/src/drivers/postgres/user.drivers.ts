import { Pool } from "pg";
import { UserGateway } from "../../gateways/users.gateway";

export class UserDriver implements UserGateway {
  private pgClient: Pool;

  constructor(pgClient: Pool) {
    this.pgClient = pgClient;
  }

  async findOrCreateUser(githubID: string, githubUserName: string, githubEmail: string): Promise<void> {
    const query = `select username from users where github_id = $1`;
    const values = [githubID];
    const res = await this.pgClient.query(query, values);
    if (res.rows.length === 0) {
      await this.createUser(githubID, githubUserName, githubEmail)
    }
  }


  private async createUser(githubID: string, githubUserName: string, githubEmail: string): Promise<void> {
    const query = `insert into users(username, email, github_id, github_username) values($1, $2, $3, $1)`;

    const values = [githubUserName, githubEmail, githubID];
    await this.pgClient.query(query, values);
    return
  }
}
