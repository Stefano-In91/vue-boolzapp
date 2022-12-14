const { createApp } = Vue;

createApp({
  data() {
    return {
      activeIndex: 0,
      lastSeen: "",
      notification: true,
      contextMenu: {
        display: false,
        top: "0px",
        left: "0px",
        selectedMsg: 0,
      },
      msgInfo: {
        display: false,
      },
      searchQuery: "",
      sendMessage: "",
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novit???",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che ?? il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho gi?? mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },
  methods: {
    activeOnClick(index) {
      this.activeIndex = index;
      this.timeAgo();
    },
    addMessage() {
      let contact = this.contacts[this.activeIndex];
      contact.messages.push({
        date: moment().format("L") + " " + moment().format("LTS"),
        message: this.sendMessage,
        status: "sent",
      });
      this.timeAgo();
      if (contact.name === "Samuele") {
        if (this.sendMessage.toLowerCase().includes("grazie")) {
          setTimeout(() => {
            contact.messages.push({
              date: moment().format("L") + " " + moment().format("LTS"),
              message: "Di niente, giovane Padawan",
              status: "received",
            });
          }, 1000);
          this.timeAgo();
        } else {
          let quote;
          axios.get("https://type.fit/api/quotes").then(function (response) {
            quote = response.data[Math.floor(Math.random() * (1000 - 1) + 1)];
          });
          setTimeout(() => {
            contact.messages.push({
              date: moment().format("L") + " " + moment().format("LTS"),
              message: quote.text,
              status: "received",
            });
          }, 1000);
          this.timeAgo();
          setTimeout(() => {
            contact.messages.push({
              date: moment().format("L") + " " + moment().format("LTS"),
              message: "Spero ti sia d'aiuto",
              status: "received",
            });
          }, 1000);
          this.timeAgo();
        }
      } else {
        setTimeout(() => {
          contact.messages.push({
            date: moment().format("L") + " " + moment().format("LTS"),
            message: "Ok",
            status: "received",
          });
        }, 1000);
        this.timeAgo();
      }
      this.sendMessage = "";
    },
    searchInContacts() {
      for (let i = 0; i < this.contacts.length; i++) {
        const contact = this.contacts[i];
        const name = contact.name.toLowerCase();
        if (!name.includes(this.searchQuery.toLowerCase())) {
          contact.visible = false;
        } else {
          contact.visible = true;
        }
      }
    },
    closeNotification() {
      this.notification = false;
    },
    timeAgo() {
      this.lastSeen = moment(
        this.contacts[this.activeIndex].messages[
          this.contacts[this.activeIndex].messages.length - 1
        ].date,
        "DD/MM/YYYY, hh:mm:ss"
      ).fromNow();
    },
    onlyTime(date) {
      return date.slice(11);
    },
    onlyDate(date) {
      return date.slice(0, 10);
    },
    showContextMenu(event) {
      this.hideMenus();
      this.contextMenu.top = `${event.clientY}px`;
      this.contextMenu.left = `${event.clientX}px`;
      this.contextMenu.display = true;
    },
    hideMenus() {
      if (this.contextMenu.display === true) {
        this.contextMenu.top = `0px`;
        this.contextMenu.left = `0px`;
        this.contextMenu.display = false;
      }
      if (this.msgInfo.display === true) {
        this.msgInfo.display = false;
      }
    },
    getScope(index) {
      this.contextMenu.selectedMsg = index;
    },
    deleteMsg() {
      this.contacts[this.activeIndex].messages.splice(
        this.contextMenu.selectedMsg,
        1
      );
      this.hideMenus();
    },
    showMsgInfo() {
      this.contextMenu.display = false;
      this.msgInfo.display = true;
    },
  },
  created() {
    moment.locale("it");
  },
  mounted() {
    this.timeAgo();
  },
}).mount("#app");
