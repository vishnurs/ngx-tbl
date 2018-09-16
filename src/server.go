package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type country struct {
	ID      bson.ObjectId `bson:"_id,omitempty"`
	Name    string        `json:"name"`
	Capital string        `json:"capital"`
}

type tblresp struct {
	Rows  []country `json:"rows"`
	Count int       `json:"count"`
}

func main() {
	http.HandleFunc("/getCountries", getCountries)
	if err := http.ListenAndServe(":5000", nil); err != nil {
		panic(err)
	}
}

func getCountries(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	db, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	defer db.Close()
	c := []country{}
	resp := tblresp{}
	db.DB("mockdb").C("countries").Find(bson.M{}).All(&resp.Rows)
	resp.Count, _ = db.DB("mockdb").C("countries").Find(bson.M{}).Count()
	fmt.Println("Phone", c)
	toSend, _ := json.Marshal(resp)
	w.Write(toSend)
}
