import m from 'mithril';
import { ListTile, List, Icon} from 'polythene-mithril'
import { Search, Shadow, IconButton } from 'polythene-mithril';

const createUserListTile = (title: string, subtitle: string, filename: string) =>
  m(ListTile, {
    title,
    subtitle,
    front: m(Icon, {
      src: `http://arthurclemens.github.io/assets/polythene/examples/${filename}.png`,
      avatar: true,
      size: "large"
    }),
    element: m.route.Link,
    url: {
      href: "/staking"
    }
  });

const listTileJennifer = createUserListTile("Jennifer Barker", "Starting post doc", "avatar-1");
const listTileAli = createUserListTile("Ali Connors", "Brunch this weekend?", "avatar-2");
const listTileGrace = createUserListTile("Grace VanDam", "Binge watching...", "avatar-3");


const iconSearchSVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/></svg>";
const iconClearSVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg>";

const iconSearch = m.trust(iconSearchSVG);
const iconClear = m.trust(iconClearSVG);

const SearchIcon = {
  view: ({ attrs }: {attrs: any}) =>
    m(IconButton, {
      icon: { svg: iconSearch },
      ink: false,
      events: { onclick: attrs.search },
    })
};

const ClearButton = {
  view: ({ attrs }: {attrs: any}) =>
    m(IconButton, {
      icon: { svg: iconClear },
      ink: false,
      events: { onclick: attrs.clear },
    })
};

const ChainInfo = () => {

	const state = {
		value: '',
    clear: () => state.value = "",
    search: (values: any) => {
      // search
    }
	};

	return {
		async oninit() {
			// await polkaDot.set('wss://kusama-rpc.polkadot.io/');
			// await polkaDot.setValidatorCount();
			// await polkaDot.setValidators();

		},
		view: ({ attrs }: {attrs: any}) => {
			return m('.row.p-top-24',
        m('.layout.horizontal', [
          m('.flex.one',
            m(ListTile, {
              title: '0022',
              subtitle: 'Validators',
              highSubtitle: 'My laaaaoooooooooooong subtitle'
            })
          ),
          m('.flex.four',
            m(Search, Object.assign({}, { className: 'margin-12',
              textfield: {
                label: 'Search',
                onChange: ({ value }: {value: string}) =>  ( state.value = value ),
                value: state.value
              },
              before: m(Shadow),
              fullWidth: true,
              buttons: {
                focus_dirty: {
                  before: m(ClearButton, { clear: state.clear }),
                  after: m(SearchIcon, { search: state.search })
                },
                dirty: {
                  before: m(ClearButton, { clear: state.clear }),
                  after: m(SearchIcon, { search: state.search })
                }
              },
              attrs
            })
            )
          ),
          m('.flex.one',
            m(ListTile, {
              title: '0022',
              subtitle: 'Nominators',
              highSubtitle: 'My laaaaoooooooooooong subtitle'
            })
          )
        ]),
        m(".row.p-top-24", [
          m(".component", [
            m(List, {
              header: { title: "Validators" },
              border: true,
              tiles: [
                listTileJennifer,
                listTileAli,
                listTileGrace
              ]
            })
          ])
        ])
      );
		}
	};
};

export default ChainInfo;
