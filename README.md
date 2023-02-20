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
Rename `.env-example` to `.env` and edit the env variable `CONNECTIONS` accordingly to how you want to connect them.

```
$ sudo aconnect -l
client 0: 'System' [type=kernel]
    0 'Timer           '
    1 'Announce        '
client 14: 'Midi Through' [type=kernel]
    0 'Midi Through Port-0'
client 20: 'Morningstar MC8' [type=kernel,card=1]
    0 'Morningstar MC8 MIDI 1'
    1 'Morningstar MC8 MIDI 2'
    2 'Morningstar MC8 MIDI 3'
    3 'Morningstar MC8 MIDI 4'
client 24: 'DOREMiDi-hub' [type=kernel,card=2]
    0 'DOREMiDi-hub MIDI 1'
    1 'DOREMiDi-hub MIDI 2'
    2 'DOREMiDi-hub MIDI 3'
client 28: 'H9 Pedal' [type=kernel,card=3]
    0 'H9 Pedal MIDI 1 '

## change your .env file
## MC8 -> H9; MC8 -> hub on port 2
## default port is 0
CONNECTIONS=Morningstar MC8,H9 Pedal;Morningstar MC8,DOREMiDi-hub:2

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

[ ] - Changelog

---

## License

This project is available under the MIT license. See [LICENSE](LICENSE.md) for the full license text.
