# Facebook page post scrapper

## Previous steps
- Set up a [Facebook developer](http://developer.facebook.com) account.
- Follow the steps to create a new Facebook app.
- Replace the client id and secret of the app, go to this URL:
  - `https://graph.facebook.com/oauth/access_token?client_id={client_id}&client_secret={client_secret}&grant_type=client_credentials`
- Keep that tab open.

## Installation
1. Clone this repository
  - `git clone git@github.com:a-rmz/fb-post-scrapper.git`
  - `git clone https://github.com/a-rmz/fb-post-scrapper.git`
2. Install the dependencies
  - `npm install`
3. Rename the `config.yaml.example` to `config.yaml`
4. Copy the `access_token` you got from the URL into the `config.yaml` file.

----

## Usage
To modify the parameters of the request, modify the adequate files in the `config.yaml` file.

More information about the usage as it develops.

----

## License
This program is licensed under the [GNU General Public License v3.0](./LICENSE.md).
