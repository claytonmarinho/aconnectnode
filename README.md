# aconnectnode

I wrote this project to help me keep my MIDI devices connected in a [SBC](https://en.wikipedia.org/wiki/Single-board_computer) with ease.

## Requirements

[Alsa-tools](https://www.alsa-project.org), [Node](https://nodejs.org/)

## Install

```
git clone https://github.com/claytonmarinho/aconnectnode && cd aconnectnode
npm i
```

## How to use

Type `aconnect -l` so you can see which MIDI controllers you got in your system.
Rename `.env-example` to `.env` and edit the env variable `CONNECTIONS` accordingly to how you want to connect them. I suggest using client names instead of ids, to avoid missing connections when the client ids are changed.

```
$ sudo aconnect -l
client 0: 'System' [type=kernel]
    0 'Timer           '
    1 'Announce        '
client 14: 'Midi Through' [type=kernel]
    0 'Midi Through Port-0'
client 20: 'H9 Pedal' [type=kernel,card=1]
    0 'H9 Pedal MIDI 1 '
client 24: 'Morningstar MC8' [type=kernel,card=2]
    0 'Morningstar MC8 MIDI 1'

## change your .env file:
CONNECTIONS=`"Morningstar MC8","H9 Pedal"`
RECONNECT_INTERVAL=60000 # -> useful for situations such when you want to re-estabilish connections without rebooting.
```

Run the application

```
# as root user
npm start
```

## pm2

With [pm2](https://pm2.io/) you will ensure that your devices stay connected once the system restarts.

```
# as root user
$ pm2 start ./src/index.js --name aconnectnode
$ pm2 save

## monitor the service
$ pm2 monit acconectnode
```

## Todo

[ ] - CI tests

---

## License

This project is available under the MIT license. See [LICENSE](LICENSE.md) for the full license text.
