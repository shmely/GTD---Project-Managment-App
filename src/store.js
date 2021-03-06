import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        demoMode: false,
        labels: [
            { content: 'Long run', color: 'green'},
            { content: 'Watch closely', color: 'yellow'},
            { content: 'Check daily', color: 'orange'},
            { content: 'Very important', color: 'red'},
            { content: 'Shared with friends', color: 'purple'},
            { content: 'Treat lightly', color: 'blue'},
            { content: 'Maybe later', color: 'indigo'}
        ],
        boards: [
            { 
                title: 'Default GTD project',
                id: 123,
                description: 'Text that describes this project, click to check this board.',
                team: [{firstName: 'Iron', LastName: 'Man' }, {firstName: 'Dr', LastName: 'Octopus'}],
                icon: 'mdi-poll',
                color: 'primary lighten-1',
                lists: [
                    {   
                        title: 'To Do',
                        items: [
                            {
                                title: 'Get someone to review your project', 
                                labels: []
                            },
                            {
                                title: 'Find a developer position that push you forward',
                                labels: []
                            },
                        ]
                    },
                    {   
                        title: 'Doing', 
                        items: [
                            {
                                title: 'Working hard on my programming skills',
                                labels: []
                            },
                        ]
                    },
                    {   
                        title: 'Done', 
                        items: [
                            {
                                title: 'Finished GTD version 1.01',
                                labels: []
                            },
                            {
                                title: 'Becoming a developer',
                                labels: []
                            }
                        ]
                    },
                ]
            },
        ],
    },
    getters: {
        demoModeState: (state) => {
            return state.demoMode
        },
        getBoardsList: (state) => {
            return state.boards
        },
        getBoard: (state) => (boardId) => {
            return state.boards.find(board => board.id === parseInt(boardId))
        },
        getList: (state, getters) => (idsObj) => {
            const board = getters.getBoard(idsObj.boardId)
            return board.lists.find(list => board.lists.indexOf(list) === idsObj.listIndex)
        },
        getListCardItem: (state, getters) => (idsObj) => {
            const list = getters.getList(idsObj)
            return list.items.find(item => list.items.indexOf(item) === idsObj.cardIndex)
        },
        getLabels: (state) => {
            return state.labels
        }
    },
    mutations: {
        demoModeToggle(state) {
            state.demoMode = !state.demoMode
        },
        addNewBoard(state, board) {
            state.boards.push(board)
        },
        addNewListToBoard(state, data) {
            data.board.lists.push(data.list)
        },
        editListTitle(state, data) {
            data.list.title = data.textareaValue
        },
        addNewCardToList(state, data) {
            data.list.items.push(data.cardItem)
        },
        deleteList(state, data) {
            data.board.lists.splice(data.listIndex, 1)
        },
        editCardContent(state, data) {
            data.card.title = data.textareaValue
        },
        insertCard(state, data) {
            data.list.items.splice(data.cardIdsObj.cardIndex, 0, data.card)
        },
        deleteCard(state, data) {
            data.list.items.splice(data.cardIndex, 1)
        }
    },
    actions: {
        demoModeToggle({ commit }) {
            commit('demoModeToggle')
        },
        addNewBoard({commit}, board) {
            commit('addNewBoard', board)
        },
        addNewListToBoard({ getters, commit }, data) {
            data.board = getters.getBoard(data.boardId)
            commit('addNewListToBoard', data)
        },
        editListTitle({ getters, commit }, data) {
            data.list = getters.getList(data.idsObj)
            commit('editListTitle', data)
        },
        addNewCardToList({ getters, commit }, data) {
            data.list = getters.getList(data.idsObj)
            commit('addNewCardToList', data)
        },
        deleteList({ getters, commit }, data) {
            data.board = getters.getBoard(data.boardId)
            commit('deleteList', data)
        },
        editCardContent({ getters, commit }, data) {
            data.card = getters.getListCardItem(data.idsObj)
            commit('editCardContent', data)
        },
        insertCard({ getters, commit }, data) {
            data.list = getters.getList(data.cardIdsObj)
            commit('insertCard', data)
        },
        deleteCard({ getters, commit }, data) {
            data.list = getters.getList(data)
            commit('deleteCard', data)
        }
    }
})