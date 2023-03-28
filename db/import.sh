collections=("users" "books")

for collection in "${collections[@]}"
do
  echo "Importing $collection"
  mongoimport --db wordlistdb --collection $collection --file ./seeds/$collection.json --jsonArray
done

echo 'Done'